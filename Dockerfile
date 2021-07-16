# 指定基于哪个镜像源进行构建
FROM registry.wxpaytest.oa.com:5000/mmpaytest/tlinux2.2-webfront
# 将build文件 copy 进指定的容器工作目录
COPY /build /usr/local