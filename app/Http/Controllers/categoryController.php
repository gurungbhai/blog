<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\categoryAttributes;

class categoryController extends Controller
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
        $category=categoryAttributes::all();
        return view('category.index',compact('category'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('category.create');
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
                'description' => 'required',
                'image' => 'mimes:jpeg,jpg,bmp,png|max:5242880',
            ]);
            $category_url="";
            $category=new categoryAttributes();
            $category->title=$request->title;
            $category->description=$request->description;
            if($request->hasFile('image')){
                // return "hello";
                $category_url=$request->file('image')->store('category/'.$request->file('image')->getClientOriginalExtension());
            }
            $category->image=$category_url;
            $category->save();
            return redirect()->route('category.index')
                            ->with('success','Category created successfully.');
            //
        }
        catch(\Exception $e){
            return $e->getMessage();
            return redirect()->route('category.index')
                            ->with('error','Something went wrong.');
        }
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
        //
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
        //
    }
}
