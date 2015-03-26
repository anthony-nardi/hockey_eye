#include <stdio.h>
#include <stdlib.h>

#include "./libwebp/webp/encode.h"
#include <node.h>

using namespace v8;

void Uint8ToRgba(const FunctionCallbackInfo<Value>& args) {
  // Create a new context or execution environment
  // that our JS can run in.
  Isolate* isolate = Isolate::GetCurrent();

  // Enter the context scope we just created.
  HandleScope scope(isolate);

  Local<Object> varName = args[0]->ToObject();

  //printf("varName.length%d", *varName);
  //
  
  args.GetReturnValue().Set(varName);

}

void init(Handle<Object> exports) {
  NODE_SET_METHOD(exports, "uint8ToRgba", Uint8ToRgba);
}

NODE_MODULE(webpEncoder, init)