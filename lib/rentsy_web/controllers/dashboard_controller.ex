defmodule RentsyWeb.DashboardController do
  use RentsyWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
