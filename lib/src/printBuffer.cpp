#include <stdio.h>
#include <stdlib.h>
#include <cstdint>

#include "./libwebp/webp/encode.h"
#include <node.h>



using namespace v8;

void Uint8ToRgba(const FunctionCallbackInfo<Value>& args) {
  // Create a new context or execution environment
  // that our JS can run in.
  Isolate* isolate = Isolate::GetCurrent();

  // Enter the context scope we just created.
  HandleScope scope(isolate);



  // Local<Object> bufferObj = args[0]->ToObject();
  


  // char* bufferData = Buffer::Data(bufferObj);
  // size_t bufferLength = Buffer::Length(bufferObj);
  // Local<Object> varName = args[0]->ToObject();

  

  // Local<ArrayBuffer> myBuff = ArrayBuffer::New (*isolate, args[0], 100);
  // Local<TypedArray> typedArray = v8::Handle<v8::TypedArray>::Cast(args[0]);

  // Local<Uint8Array> uint8Array = v8::Handle<v8::Uint8Array>::Cast(typedArray);

  // std::uint8_t *buffer = arrayBuf;

  // string s = std::type_info(args[0]).name();
  // printf('%s', s);
  //printf("varName.length%d", *varName);
  
// v8::Handle<v8::Array> buffer = v8::Handle<v8::Array>::Cast(arg);

  std::uint8_t* retb = NULL;
  // std::uint8_t *buffer =  v8::Handle<v8::Array>::Cast(*args[0]);
  // printf("size: %d\n", (int)sizeGetIndexedPropertiesPixelData);
  // free(buffer);
  // free(retb);
  // return 0;
  // 
  // 
  
  // uint8_t *buffer = arrayBuf->GetIndexedPropertiesPixelData();




  

  // buffer = (uint8_t*)malloc(size);

  // buffer = arrayBuf;

  Local<ArrayBuffer> arrayBuf = v8::Handle<v8::ArrayBuffer>::Cast(args[0]);
  // Local<ArrayBufferView> arrayBufView = v8::Handle<v8::ArrayBufferView>::Cast(arrayBuf);
  // Local<TypedArray> typedArray = v8::Handle<v8::TypedArray>::Cast(args[0]);
  // Local<Uint8Array> uint8Array = v8::Handle<v8::Uint8Array>::Cast(args[0]);

  // size_t size = args[0]->ByteLength();
	// size_t size = uint8Array->ByteLength();
  // Local<Number> num = Number::New(isolate, size);
  // printf("size%d", size);
  ArrayBuffer::Contents mycontent = arrayBuf->Externalize();
  
  std::uint8_t *buffer = NULL;
  
  buffer = (uint8_t*)mycontent.Data();

  size_t size2 = WebPEncodeRGBA(buffer, 1920, 1080, 1920, 100, &retb);
 
 args.GetReturnValue().Set(arrayBuf); 
 // args.GetReturnValue().Set(uint8Array->IsUint8ClampedArray());
  // args.GetReturnValue().Set(num);

}

void init(Handle<Object> exports) {
  NODE_SET_METHOD(exports, "uint8ToRgba", Uint8ToRgba);
}

NODE_MODULE(webpEncoder, init)