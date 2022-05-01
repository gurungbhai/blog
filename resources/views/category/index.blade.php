@extends('layouts.app')

@section('content')
<div class="row">
    <div class="col-sm-12">
        <div class="page-title-box">
            <div class="row align-items-center">
                <div class="col-md-8">
                    <h5 class="mb-1">
                        <i class="mdi mdi-bike"></i> &nbsp; category
                    </h5>
                </div>
                <div class="col-md-4 d-flex justify-content-end">
                    <a href="{{ route('category.create') }}" style="margin-left: 1em;" class="btn btn-secondary btn-rounded btn-success pull-right"><i class="fa fa-plus"></i> Add New category</a>
                </div>
            </div>

        </div>
    </div>
</div>
<div class="row">
    <div class="col-12">
        <div class="card m-b-30">
            <div class="card-body table-responsive">
                @if (count($category) != 0)
                <table id="datatable" class="table table-bordered"
                style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                    <thead>
                        <tr>
                            <th width="5%">SN</th>
                            <th width="25%">TITLE</th>
                            <th width="50%">Description</th>
                            <th>image</th>
                            <th width="20%">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    @foreach ($category as $index => $category)
                     <tr>
                            <td>{{ $index+1}}</td>
                            <td>{{ $category->title }}</td>
                            <td>{!! $category->description !!}</td>
                            <td><img src="{{  asset('storage/' .$category->image) }}" alt=""></td>

                            <td>
                            <form action="{{ route('category.destroy',$category->id) }}" method="POST">
       
                                
    
                                <a class="btn btn-primary" href="{{ route('category.show',$category->id) }}" class="btn btn-secondary btn-primary">show</a>
    
                                {{ csrf_field() }}
                                {{ method_field('DELETE') }}
    
                                <button type="submit"  class="btn btn-danger" class="btn btn-secondary btn-success">delete</button>
                                </form>
                            
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                    <tfoot>
                        <tr>
                          <th width="5%">SN</th>
                            <th width="25%">TITLE</th>
                            <th width="50%">Description</th>
                            <th>image</th>
                            <th width="20%">Action</th>
                        </tr>
                    </tfoot>
                </table>
                @else
                <h6 class="no-result">No results found</h6>
                @endif
            </div>
        </div>
    </div>
</div>
@endsection


