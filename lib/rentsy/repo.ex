defmodule Rentsy.Repo do
  use Ecto.Repo,
    otp_app: :rentsy,
    adapter: Ecto.Adapters.Postgres
end
