defmodule RentsyWeb.LayoutView do
  use RentsyWeb, :view

  def is_public_page?(conn = %Plug.Conn{path_info: path_info}) do
    path_info
    |> join_path()
    |> String.equivalent?(Routes.page_path(conn, :index))
  end

  def is_session_page?(conn = %Plug.Conn{path_info: path_info}) do
    current_page = path_info |> join_path()

    [
      Routes.user_session_path(conn, :new),
      Routes.user_registration_path(conn, :new),
      Routes.user_reset_password_path(conn, :new)
    ]
    |> Enum.any?(&String.equivalent?(current_page, &1))
  end

  def is_individual?(%Plug.Conn{assigns: %{current_user: %{type: "individual"}}}), do: true
  def is_individual?(%Plug.Conn{assigns: %{current_user: %{type: _}}}), do: false

  def is_landlord?(%Plug.Conn{assigns: %{current_user: %{type: "landlord"}}}), do: true
  def is_landlord?(%Plug.Conn{assigns: %{current_user: %{type: _}}}), do: false

  def get_user_label(%Plug.Conn{assigns: %{current_user: %{type: "individual"}}}),
    do: "Individual"

  def get_user_label(%Plug.Conn{assigns: %{current_user: %{type: "landlord"}}}),
    do: "Landlord"

  def get_full_name(%Plug.Conn{assigns: %{current_user: %{first_name: first, last_name: last}}}),
    do: first <> " " <> last

  defp join_path(path_info), do: "/" <> Enum.join(path_info, "/")
end
