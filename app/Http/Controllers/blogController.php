<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\blogAttributes;
use App\Models\authorAttributes;
use App\Models\blogs_categories;
use App\Models\categoryAttributes;
use App\Http\Controllers\authorController;

class blogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
     public function __construct()
    {
        $this->middleware('auth');
    }
    public function index()
    {
        $blog=blogAttributes::all();
        return view('blog.index',compact('blog'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $category=categoryAttributes::all();
        return view('blog.create',compact('category'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{
          $this->validate($request, [
            'title' => 'required',
            'content' => 'required',
            'category' => 'required',
            'author_name' => 'required',
            'author_email' => 'required',
        ]);

        $blog=new blogAttributes();
        $blog->title=$request->title;
        $blog->content=$request->content;
        $blog->category_id=$request->category;
        //check if author exists
        $author=authorAttributes::where('email',$request->author_email)->first();
        if($author){
            $blog->author_id=$author->id;
        }
        else{
            $author= new authorController();
            $author_id=$author->store($request);
            $blog->author_id=$author_id->id;
        }
        
        $blog->tags=$request->tags;
        $blog->save();

        $relation= new blogs_categories();
        $relation->blog_id=$blog->id;
        $relation->category_id=$request->category;
        $relation->save();
        return redirect()->route('blog.index')
                        ->with('success','Notice created successfully.');
    }
    catch(\Exception $e){
        return $e->getMessage();
    }
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        try {
            $blog = blogAttributes::findOrFail($id);
            return view('blog.edit',compact('blog'));
        } catch (ModelNotFoundException $e) {
            return view('errors.404');
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {

            blogAttributes::find($id)->delete();
            return back()->with('message', 'blog deleted successfully');
        } 
        catch (Exception $e) {
            return back()->with('flash_error', 'blog Not Found');
        }
    }
}
