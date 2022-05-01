@extends('layouts.app')

@section('content')
    <div class="row">
        <div class="col-sm-12">
            <div class="page-title-box">
                <div class="row align-items-center">
                    <div class="col-md-8">
                        <h4 class="page-title m-0">Add New Category</h4>
                    </div>
                    @if(session()->has('message'))
                        <div class="alert alert-danger">
                            {{ session()->get('message') }}
                        </div>
                    @endif
                </div>

            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <form action="{{ route('category.store') }}" method="POST"
                        enctype="multipart/form-data" role="form">
                        {{ csrf_field() }}
                        <div class="row form-group align-items-center">
                            <div class="col-md-2 text-right">
                                <label for="first_name">TITLE</label>
                            </div>
                            <div class="col-md-10">
                                <input class="form-control" type="text" value=""
                                    name="title" required id="title" placeholder="enter title">
                            </div>
                        </div>
                        <div class="row form-group align-items-center">
                            <div class="col-md-2 text-right">
                                <label for="first_name">Description</label>
                            </div>
                            <div class="col-md-10">
                                <input class="form-control" type="text" value=""
                                    name="description" id="Description" placeholder="Eg:enter Descriptopn">
                            </div>
                        </div>
                        
                         <div class="row form-group align-items-center">
                            <div class="col-md-2 text-right">
                                <label for="picture">Image</label>
                            </div>
                            <div class="col-md-10">
                                <input type="file" accept="image/*" name="image" >
                            </div>
                        </div>
                        <div class="row form-group align-items-center justify-content-end">
                            <a href="{{ route('category.index') }}" class="btn btn-danger mr-2">Cancel</a>
                            <button type="submit" class="btn btn-primary mr-2">Add Category</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

@endsection
