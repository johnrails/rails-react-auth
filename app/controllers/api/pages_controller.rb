class Api::PagesController < ApplicationController
  before_action :set_page, only: [:show]
  before_action :authenticate_user, only: [:show], if: :page_access

  def index
    render json: Page.select(:id, :title, :allow_unauth)
  end

  def show
    render json: @page.as_json
  end

  private
  def set_page
    @page = Page.find(params[:id])
  end

  def page_access
    !@page.allow_unauth
  end
end
