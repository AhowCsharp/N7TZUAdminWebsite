#!/bin/bash
host=ubuntu@n7tzu.org
path=/x/N7TZUAdminwebsite
npm run build
cd build
tar -zcvf ../N7TZUAdminwebsite.tgz *
cd ..
scp N7TZUAdminwebsite.tgz $host:$path
ssh $host tar zxvf $path/N7TZUAdminwebsite.tgz -C $path/build