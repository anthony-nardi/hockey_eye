cmd_Release/obj.target/helloWorld.node := flock ./Release/linker.lock g++ -shared -pthread -rdynamic -m64  -Wl,-soname=helloWorld.node -o Release/obj.target/helloWorld.node -Wl,--start-group Release/obj.target/helloWorld/helloWorld.o -Wl,--end-group 
