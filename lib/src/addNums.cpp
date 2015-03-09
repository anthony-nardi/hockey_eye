// Isolate is a V8 class that will give us a
// new instance of the v8 engine.
#include <node.h>

using namespace v8;

void AddNums(const FunctionCallbackInfo<Value>& args) {
  // Isolate is a V8 class that will give us a new
  // instance of the V8 engine.
  // The call to GetCurrent() will give us the scope
  // of the current thread.
  Isolate* isolate = Isolate::GetCurrent();
  HandleScope scope(isolate);

  // We will now check that both args are numbers
  if (args.Length() < 2) {
  	isolate->ThrowException(Exception::TypeError(
  		String::NewFromUtf8(isolate, "Wrong number of args.")));
  	  return;
  }

  if (!args[0]->IsNumber() || !args[1]->IsNumber()) {
  	isolate->ThrowException(Exception::TypeError(
  		String::NewFromUtf8(isolate, "Args must be Numbers.")));
  	  return;
  }

  // Now we know we have two numbers, get the int ready
  // for the caller.
  int returnVal = args[0]->NumberValue() + args[1]->NumberValue();
  // We will now set the return value in the instance.
  Local<Number>  numToSet = Number::New(isolate, returnVal);
  // Set the return value for the func.
  args.GetReturnValue().Set(numToSet);
}

// Here you must define the init function.
// Set the method name to hello and pass in the Method
// as the third param.
void init(Handle<Object> exports) {
  NODE_SET_METHOD(exports, "addNums", AddNums);
}


// Here we are passing in the module name and the name of
// the init function.  The name of the module must be the name
// of the file binary minus the .node suffix.
NODE_MODULE(addNums, init)