#!/bin/bash
sudo docker run -p 9999:80 --cap-add sys_ptrace --rm -v $(pwd)/website:/usr/share/nginx/html -it vizzed
