#include <node.h>

using namespace v8;

void HelloWorld(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = Isolate::GetCurrent();
  HandleScope scope(isolate);

  args.GetReturnValue().Set(String::NewFromUtf8(isolate, "Hello World."));
}

void init(Handle<Object> exports) {
  NODE_SET_METHOD(exports, "helloWorld", HelloWorld);
}

NODE_MODULE(helloWorld, init)