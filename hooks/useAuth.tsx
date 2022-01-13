import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useMemo,
} from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,
} from "@apollo/client";
import { useRouter } from "next/router";

interface AuthContextType {
  isSignedIn: () => boolean;
  loading: boolean;
  error?: any;
  signIn: (email: string, password: string) => void;
  signUp: (email: string, password: string) => void;
  signOut: () => void;
}

const authContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }) {
  const router = useRouter();
  const [authToken, setAuthToken] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  // If we change page, reset the error state.
  useEffect(() => {
    if (error) setError(null);
  }, [router.pathname]);

  const isSignedIn = () => {
    return !!authToken;
  };

  const getAuthHeaders = () => {
    if (!authToken) return null;

    return {
      authorization: `Bearer ${authToken}`,
    };
  };

  const createApolloClient = () => {
    const link = new HttpLink({
      uri: process.env.NEXT_PUBLIC_GQL_ENDPOINT,
      headers: getAuthHeaders(),
    });

    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });
  };

  const signIn = async (email, password) => {
    setLoading(true);

    const client = createApolloClient();
    const LoginMutation = gql`
      mutation ($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
        }
      }
    `;

    await client
      .mutate({
        mutation: LoginMutation,
        variables: { email, password },
      })
      .then((result) => {
        if (result?.data?.login?.token) {
          setAuthToken(result.data.login.token);
          router.push("/dashboard");
        }
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const signUp = async (email, password) => {
    setLoading(true);

    const client = createApolloClient();
    const SignUpMutation = gql`
      mutation ($email: String!, $password: String!) {
        signUp(email: $email, password: $password) {
          email
          id
        }
      }
    `;

    await client
      .mutate({
        mutation: SignUpMutation,
        variables: { email, password },
      })
      .then((_result) => {
        // consider creating a "sign up" success card/page to direct to and prompt user to login"
        router.push("/");
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const signOut = () => {
    //TODO: Call the logout endpoint to remove the auth token on the server side
    setAuthToken(null);
    router.push("/");
  };

  const memoedValue = useMemo(
    () => ({
      loading,
      error,
      isSignedIn,
      signIn,
      signOut,
      signUp,
    }),
    [isSignedIn, loading, error]
  );

  return (
    <authContext.Provider value={memoedValue}>
      <ApolloProvider client={createApolloClient()}>{children}</ApolloProvider>
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};
