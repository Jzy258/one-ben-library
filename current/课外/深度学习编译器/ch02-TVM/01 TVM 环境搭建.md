* TVM：
	* **本质**：C++ 编写的编译器
	* **组成**：
		* C++ 核心：`libtvm.dll`
			* **包括**：Pass 系统；代码生成；Runtime
		* Python 绑定：`apache-tvm` 包
			* **包括**：relax；tirx；te；s_tir；topi；script（⚠️ 2026-09-17 实测：**`relay` / `autotvm` 在 0.26 已移除**，勿照搬综述）
	* TVM 支持的后端由编译 C++ 核心时的开关决定
		* `USE_CUDA=ON`
		* `USE_LLVM=/path/to/llvm`
* `tvm`：
	* `tvm.__version__`：
		* **作用**：获取当前安装的 TVM 版本号
	* `tvm.__file__`：
		* **作用**：获取 TVM Python 包的入口文件路径
	* `tvm.cpu(dev_id=0)`：
		* **作用**：
			* 构造一个 CPU 设备上下文，告知 TVM 运行时接下来的计算或内存分配在指定的 CPU 设备上进行
		* `tvm.cpu().exist`：
			* **作用**：判断 CPU 设备是否真实存在且可用
	* `tvm.cuda(dev_id=0)`：
		* **作用**：
			* 构造一个 CUDA GPU 设备上下文，告知 TVM 运行时接下来的计算或内存分配在指定的 CUDA GPU 上进行
		* `tvm.cuda().exist`：
			* **作用**：判断 CUDA GPU 设备是否真实存在且可用
* `tvm.support`：
	* **作用**：集成 TVM 与外部命令行工具及主机端工具
		* **如**：编译器、归档器、子进程池、构建信息
	* `tvm.support.libinfo()`：
		* **作用**：
			* 查询编译期构建信息，包含 TVM 编译时配置的各项参数
			* **如**：CMake 编译参数、Git 提交 hash、依赖库版本
		* **返回**：`Dict[str, str]`
		* 常用构建配置键（⚠️ **2026-09-17 实测修正**：0.26 的 libinfo() **只返回 15 个键，且全是 `USE_*` 开关**；`TVM_VERSION` / `CUDA_VERSION` / `USE_RPC` / `USE_GRAPH_EXECUTOR` **并不存在**）：
			* `USE_CUDA`：是否启用 NVIDIA CUDA 后端（本机实测 `ON`）
			* `USE_LLVM`：是否启用 LLVM 后端（本机实测 `ON`）
			* `USE_CUDNN`：是否启用 cuDNN 支持（本机实测 `OFF`）
			* `USE_OPENCL` / `USE_VULKAN` / `USE_METAL` / `USE_ROCM`：其他后端（本机实测均 `OFF`）
			* `USE_CUTLASS` / `USE_NCCL` / `USE_NVTX` / `USE_HEXAGON` / `USE_CLML` / `USE_NVSHMEM` / `USE_NNAPI_CODEGEN` / `USE_NNAPI_RUNTIME`
			* ⚠️ 开关值**不完全反映实际可用性**：本机 Windows 上 `USE_NCCL=ON`（NCCL 仅支持 Linux）
* `tvm.target`：
	* **作用**：TVM 编译过程中描述目标硬件和代码生成规则
	* `tvm.target.Target(target, host=None)`：
		* **作用**：
			* 在 TVM 编译期描述目标硬件
			* 作为属性查找表，指导代码生成器（Codegen）和优化 Pass 为特定设备生成高效代码
		* 