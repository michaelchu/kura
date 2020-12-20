defmodule Rentsy.Repo.Migrations.AddTypeToUser do
  use Ecto.Migration

  def change do
    alter table("users") do
      add :type, :text
    end
  end
end
