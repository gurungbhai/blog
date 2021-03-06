@extends('layouts.app')

@section('content') 
 <script src="https://cdn.tiny.cloud/1/no-api-key/tinymce/5/tinymce.min.js" referrerpolicy="origin"></script>
 {{-- CSS and JS for tagsinput and typeahead --}}
<script type="text/javascript" src="{{asset('asset/front/js/typeahead.min.js')}}"></script>
<script type="text/javascript" src="{{asset('asset/front/js/bootstrap-tagsinput.js')}}"></script>
<link rel="stylesheet" type="text/css" href="{{asset('asset/front/css/bootstrap-tagsinput.css')}}">
<link rel="stylesheet" type="text/css" href="{{asset('asset/front/css/typeaheadjs.css')}}">
 <div class="row">
    <div class="col-sm-12">
        <div class="page-title-box">
            <div class="row align-items-center">
                <div class="col-md-4">
                    <h4> <i class="fa fa-plus"></i>&nbsp; Add Blogs

                    </h4>
                </div>
               
            </div>
        </div>
    </div>
</div>
<div class="row">
	<div class="col-12">
		<div class="card">
			<div class="card-body">
				
				<form class="form-horizontal" action="{{route('blog.store')}}" method="POST" enctype="multipart/form-data" role="form">
					{{csrf_field()}}
				
					<div class="row form-group align-items-center">
						<div class="col-md-2 text-right">
							<label for="first_name">title </label>
						</div>
						<div class="col-md-10">
							<input class="form-control" type="text"  name="title" required id="title" placeholder="title">
						</div>
					</div>
					<div class="row form-group align-items-center">
						<div class="col-md-2 text-right">
							<label for="first_name">content </label>
						</div>
						<div class="col-md-10">
							<textarea id="Description" class="form-control" style="height:150px" name="content" placeholder="content"></textarea>	
						</div>
					</div>
					<div class="row form-group align-items-center">
						<div class="col-md-2 text-right">
							<label for="first_name">Category </label>
						</div>
						<div class="col-md-10">
							<select class="user_id  form-control" id="category" name="category">
								@foreach (@$category as $category)
									<option value="{{@$category->id}}"> {{@$category->title}}</option>
								@endforeach
                        	</select>
						</div>
					</div>
                    <div class="row form-group align-items-center">
						<div class="col-md-2 text-right">
							<label for="first_name">Tags </label>
						</div>
                        <div class="col-10">
                            <input class="form-control form-control typeahead" type="text"
                                style="background-color:none;" 
                                placeholder="Type in tags" name="tags" id="tags" autofocus>
                        </div>
                        
                    </div>

                    <div class="row form-group align-items-center">
                        <div class="col-md-2 text-right">
                            <label for="first_name">Author Name </label>
                        </div>
                        <div class="col-md-10">
                            <input class="form-control" type="text"  name="author_name" required id="author_name" placeholder="Enter Author Name">
                        </div>
                    </div>
                    <div class="row form-group align-items-center">
                        <div class="col-md-2 text-right">
                            <label for="first_name">Author Email </label>
                        </div>
                        <div class="col-md-10">
                            <input class="form-control" type="text"  name="author_email" required id="author_email" placeholder="Enter Author Email">
                        </div>
                    </div>
					<div class="row form-group align-items-center justify-content-end">
						<a href="{{route('blog.index')}}" class="btn btn-danger mx-2">Cancel</a>
						<button type="submit" class="btn btn-primary mr-2">Create Blog</button>
					</div>

				</form>
			</div>
		</div>
	</div>
</div>




<script>
    document.addEventListener('keypress', function (e) {
        if (e.keyCode === 13 || e.which === 13) {
            e.preventDefault();
            return false;
        }
        
    });

tinymce.init({
  selector: 'textarea#Description',
  height: 500,
  menubar: false,
  plugins: [
    'advlist autolink lists link image charmap print preview anchor',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table paste code help wordcount'
  ],
  toolbar: 'undo redo | formatselect | ' +
  'bold italic backcolor | alignleft aligncenter ' +
  'alignright alignjustify | bullist numlist outdent indent | ' +
  'removeformat | help',
  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
});

	var tags = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.whitespace,
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		// url points to a json file that contains an array of country names, see
		// https://github.com/twitter/typeahead.js/blob/gh-pages/data/countries.json
		
	});
	tags.initialize();

	$('.typeahead').tagsinput({
	typeaheadjs: {
		name: 'tags',
		source: tags.ttAdapter()
	}
	});
	var restricted_zone = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.whitespace,
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		// url points to a json file that contains an array of country names, see
		// https://github.com/twitter/typeahead.js/blob/gh-pages/data/countries.json
	});


	$('#submit').click(function(){
		console.log($('.typeahead').val());
	});

</script>
@endsection