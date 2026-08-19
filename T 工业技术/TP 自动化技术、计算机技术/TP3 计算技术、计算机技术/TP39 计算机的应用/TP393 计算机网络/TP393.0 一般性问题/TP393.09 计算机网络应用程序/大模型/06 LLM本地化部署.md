* 获取模型权重：
	* 开源模型发布平台：
		* 全球最大：Hugging Face
		* 国内适用：ModelScope
	* `python3-devel`：
		* Python SDK 环境
	* 虚拟环境：
		* 用于独立存放 Python 依赖，避免影响系统环境
		* `python3 -m venv`：
			* 创建虚拟环境
		* `source`：
			* 加载虚拟环境
	* 模型权重文件结构：
		* `config.json`：
			* 模型的结构和配置信息
		* `generation_config.json`：
			* 生成 token 时的默认配置，包含温度等参数
		* `tokenizer.json`：
			* token 字符对应表
			* token 处理的相关配置和聊天模板
		* `*.safetensors`：
			* 包含模型的所有权重
			* 神经网络层及参数
* 运行模型：
	* 使用 `python` 库通过代码加载权重和配置
	* `llama.cpp`：
		* 基于 C++ 的高性能大语言模型推理框架
		* 独创了 GGUF 格式的模型文件
		* 依赖 Python 实现 GGUF 格式转换：
			* `convert_hf_to_gguf.py`：
				* 转换模型本体
			* `convert_lora_to_gguf.py`：
				* 转化 LoRA
		* 根据官方提供的 `requirements.txt` 安装所需依赖
	* 编译配置：
		* 内存 >= 6G：
			* 会影响 Web UI 界面的编译
		* 需要额外配置 Node.js 的环境：
			* 用于编译 Web UI
	* 需要安装的库：
		* 配置国内镜像：
			* `npm config set registry https://registry.npmmirror.com`
		* `epel-release`：
			* 针对 rhel 系发行版系统的扩展仓库
			* 用于补充第三方软件
			* 需要使用 `/usr/bin/crb enable` 激活 `crb` 仓库，与 `epel` 共同作用
		* `cmake`：
			* 用于构建脚本的生成和管理
		* `ccache`：
			* 用于缓存编译文件，便于多次编译或更新编译时复用缓存，减少编译时间
		* `openssl-devel`：
			* 使服务端支持 SSL
		* `nodejs`：
			* 实现 Web UI 的编译
	* **流程**：
		* `cd $LLAMA_HOME`
		* 【...】
		* `cmake --build build --config Release`：
			* 开始编译
			* 默认单核进行
			* `-j`：
				* 指定编译的线程数量，加快编译速度
				* 设置数量为 CPU 核心数 -1，以防止系统崩溃
		* `nproc`：
			* 查看处理器核心数
	* 常用 `llama.cpp` 组件：
		* `llama-cli`
		* `llama-quantize`
		* `llama-server`
		* 【...】
	* 运行模型：
		* `llama-cli`：
			* 在命令行中运行模型
			* `-m`：
				* 指定模型
			* 运行后可以直接开始对话
		* `llama-server`：
			* 运行 `llama` 服务器
			* `-m`：
				* 指定模型
			* `--host`：
				* 指定可以接入的 IP（掩码）
			* `--port`：
				* 指定开放的端口
			* `-a`：
				* 为模型重新命名
			* 可以通过浏览器访问
	* LM Studio 本质是 `llama.cpp` 的实现
* 模型的量化：
	* **本质**：
		* 用精度换性能
	* `llama-quantize`：
		* 用于量化模型
	* 常用量化级别：
		* `Q8_0`：
			* 8 位整数，对模型能力的影响较小，且能节约大量空间
		* `Q4_K_M`：
			* 4 位整数，对模型能力的影响开始显现，性价比最佳
	* 一般大参数模型量化后的表现通常优于小参数模型不量化
* 视觉投影：
	* 在 `llama.cpp` 中，要单独提取视觉层投影为 GGUF，在后续运行附加到模型上
	* `--mmproj`：
		* 提取视觉投影层，导出为 GGUF 格式
	* `llama-sever`：
		* `-mm`：
			* 附加视觉层
	* 视觉层一般不经过量化
* 模型推理优化和评估：
	* 大语言模型工作阶段：
		* `Perfill`：
			* 将接收到的提示词一次性地、并行地由神经网络计算，得到第一个输出 token
			* 这个阶段需要大量的矩阵乘法运算，依赖 GPU 算力
		* `Decode`：
			* 从输出的第二个 token 开始，逐个生成 token，每次生成都要重新运行一遍完整的网络
			* 需要大量的显存数据的读取，依赖显存存取速度
	* 提高 Decode 速度：
		* 使用 KV Cache 缓存之前 token 生成时产生的值，在下一个 token 计算时直接读取，减少计算
		* 每个 token 在 KV Cache 中占用的空间：
			* 2 * Transformer 层数 * KV 头数量 * 每个头的维度 * 数据类型精度
		* 总 KV Cache 空间：
			* 单个 token 空间 * token 序列长度 * 并发数
	* 一般通过 `benchmark` 评估模型性能
		* 改变单一变量测试模型的输入输出情况
* 多模型路由：
	* `llama-server` 支持基于 `ini` 配置文件配置多个不同的模型，从而在一个端口上提供多个模型的服务
		```ini
# 模型名
[]
# 模型的gguf路径
model = 
# 模型视觉投影
mmproj = 
fa = 
mgl = 
		```
	* `--model-preset`：
		* 指定需要读取的配置文件
