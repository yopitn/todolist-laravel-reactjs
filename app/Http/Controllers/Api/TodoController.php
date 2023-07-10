<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TodoController extends Controller
{
    public function index(Todo $todo)
    {
        try {
            $todos = $todo->orderBy('created_at', 'desc')->get();

            return response()->json([
                'todos' => $todos
            ], 200);
        } catch (\Throwable $exception) {
            return response()->json([
                'errors' => [
                    'message' => $exception->getMessage()
                ]
            ], 400);
        }
    }

    public function store(Request $request, Todo $todo)
    {
        try {
            $validator = Validator::make($request->all(), [
                'task' => 'required|string'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => [
                        'message' => $validator->errors()
                    ]
                ], 422);
            }

            $todo = $todo->create([
                'task' => $request->task,
                'status' => $request->status
            ]);

            return response()->json([
                'todo' => $todo,
                'message' => 'Todo created successfully'
            ], 200);
        } catch (\Throwable $exception) {
            return response()->json([
                'errors' => [
                    'message' => $exception->getMessage()
                ]
            ], 400);
        }
    }

    public function show(Todo $todo, $id)
    {
        try {
            $todo = $todo->where('id', $id)->first();

            if (is_null($todo)) {
                return response()->json([
                    'errors' => [
                        'message' => [
                            'flash' => "Todo not found"
                        ]
                    ]
                ], 404);
            }

            return response()->json([
                'todo' => $todo
            ], 200);
        } catch (\Throwable $exception) {
            return response()->json([
                'errors' => [
                    'message' => $exception->getMessage()
                ]
            ], 400);
        }
    }

    public function update(Request $request, Todo $todo, $id)
    {
        try {
            $todo = $todo->where('id', $id)->first();

            if (is_null($todo)) {
                return response()->json([
                    'errors' => [
                        'message' => [
                            'flash' => "Todo not found"
                        ]
                    ]
                ], 404);
            }

            $todo->update([
                'status' => $request->status,
            ]);

            return response()->json([
                'todo' => [
                    'status' => $request->status,
                ]
            ]);
        } catch (\Throwable $exception) {
            return response()->json([
                'errors' => [
                    'message' => $exception->getMessage()
                ]
            ], 400);
        }
    }

    public function destroy(Todo $todo, $id)
    {
        try {
            $todo = $todo->where('id', $id)->first();

            if (is_null($todo)) {
                return response()->json([
                    'errors' => [
                        'message' => [
                            'flash' => "Todo not found"
                        ]
                    ]
                ], 404);
            }

            $todo->delete();

            return response('', 204);
        } catch (\Throwable $exception) {
            return response()->json([
                'errors' => [
                    'message' => $exception->getMessage()
                ]
            ], 400);
        }
    }
}
