class GalleriesController < ApplicationController
  # GET /galleries
  # GET /galleries.xml
  def index
    @galleries = Gallery.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @galleries }
      # IPHONE VIEW INDEX
      format.json do
        result= Array.new
        @galleries.each do |gallery|
          hash = Hash.new
          hash[:title] = gallery.title
          hash[:date] = gallery.date
          hash[:thumbnail] = gallery.gallery_items[0].image.url(:iphone_thumb)
          hash[:id] = gallery.id
          result.push hash
        end
        render :json => result.to_json
      end
    end
  end

  # GET /galleries/1
  # GET /galleries/1.xml
  def show
    @gallery = Gallery.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @gallery }
      
      # IPHONE VIEW (UNUSED)
      # format.json do
      #   # @galleries
      #   result= Array.new
      #   @gallery.gallery_items.each do |item|
      #     hash = Hash.new
      #     hash[:item_id] = item.id
      #     hash[:thumbnail] = item.image.url(:iphone_thumb)
      #     result.push item
      #   end
      #   render :json => result.to_json
      # end
    end
  end


  def gallery_ajax
    @gallery = Gallery.find(params[:id])
    
    respond_to do |format|
      format.html {render :template => "galleries/show_ajax", :layout => false}
    end
  end

  # GET /galleries/new
  # GET /galleries/new.xml
  def new
    @gallery = Gallery.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @gallery }
    end
  end

  # GET /galleries/1/edit
  def edit
    @gallery = Gallery.find(params[:id])
  end

  # POST /galleries
  # POST /galleries.xml
  def create
    @gallery = Gallery.new(params[:gallery])

    respond_to do |format|
      if @gallery.save
        format.html { redirect_to(@gallery, :notice => 'Gallery was successfully created.') }
        format.xml  { render :xml => @gallery, :status => :created, :location => @gallery }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @gallery.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /galleries/1
  # PUT /galleries/1.xml
  def update
    @gallery = Gallery.find(params[:id])

    respond_to do |format|
      if @gallery.update_attributes(params[:gallery])
        format.html { redirect_to(@gallery, :notice => 'Gallery was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @gallery.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /galleries/1
  # DELETE /galleries/1.xml
  def destroy
    @gallery = Gallery.find(params[:id])
    @gallery.destroy

    respond_to do |format|
      format.html { redirect_to(galleries_url) }
      format.xml  { head :ok }
    end
  end


end
