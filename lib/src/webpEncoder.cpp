#include "./libwebp/webp/encode.h"
#include <node.h>

using namespace v8;

void Uint8ToRgba(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = Isolate::GetCurrent();
  HandleScope scope(isolate);

  args.GetReturnValue().Set(String::NewFromUtf8(isolate, "Rgba Stuff."));
}

void init(Handle<Object> exports) {
  NODE_SET_METHOD(exports, "uint8ToRgba", Uint8ToRgba);
}

NODE_MODULE(webpEncoder, init)
