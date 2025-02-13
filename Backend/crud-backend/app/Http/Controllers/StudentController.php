<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    //
    public function index(){
       $students = Student::all();
       if($students->count()>0){
        return response()->json([
            'status'=> 200,
            'students'=> $students
           ],200);
       }
       else{
        return response()->json([
            'status'=> 404,
            'students'=> "no records found!"
           ],404);
       }
        
    }

    public function store(Request $req){
       
        $validator = Validator::make($req->all(), [
            'name' => 'required|string|max:40',
            'course' => 'required|string|max:40',
            'email' => 'required|email',
            'phone' => 'required|digits:10',
        ]);
    
       
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors()
            ], 422);
        }
    
        // Create the student entry
        try {
            $student = Student::create([
                'name' => $req->name,
                'course' => $req->course,
                'email' => $req->email,
                'phone' => $req->phone,
            ]);
    
            return response()->json([
                'status' => 200,
                'message' => "Student entry added successfully",
                'student' => $student
            ], 200);
    
        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => "Something went wrong",
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id){
         $student = Student::find($id);
         if($student){
            return response()->json([
                'status'=>200,
                'student'=>$student
            ],200);
         }
         else{
            return response()->json([
                'status'=> 500,
                'students'=> "Something went wrong"
               ],500);
         }
    }

    public function edit(int $id){
        $student = Student::find($id);
         if($student){
            return response()->json([
                'status'=>200,
                'student'=>$student
            ],200);
         }
         else{
            return response()->json([
                'status'=> 500,
                'students'=> "Something went wrong"
               ],500);
         }
    }

    public function update(Request $req, int $id){
        $student = Student::find($id);

        // Check if student exists
        if (!$student) {
            return response()->json([
                'status' => 404,
                'message' => "Student not found"
            ], 404);
        }

        $validator = Validator::make($req->all(), [
            'name' => 'required|string|max:40',
            'course' => 'required|string|max:40',
            'email' => 'required|email',
            'phone' => 'required|digits:10',
        ]);
    
       
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors()
            ], 422);
        }
        try{
           $student->update([
              'name' => $req->name,
                'course' => $req->course,
                'email' => $req->email,
                'phone' => $req->phone,
            ]);
            return response()->json([
                'status' => 200,
                'message' => "Student entry updated successfully",
                'student' => $student 
            ], 200);

        }catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => "Something went wrong",
                'error' => $e->getMessage()
            ], 500);
        }
    
    }

    public function destroy($id){
        $student = Student::find($id);
    
        if (!$student) {
            return response()->json([
                'status' => 404,
                'message' => "Student not found"
            ], 404);
        }
    
        try {
            $student->delete();
            return response()->json([
                'status' => 200,
                'message' => "Entry deleted successfully"
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => "Unable to delete the entry",
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
} 
