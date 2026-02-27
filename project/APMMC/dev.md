---
title: "参与编写与开发"
# subtitle: ""
layout: project-post
author: "何尹铭"
header-style: text
# hidden: true
---

## 提建议或讨论
可在GitHub的[Issues](https://github.com/Yummy-He/APMMC/issues){:target="_blank"}或Gitee的[Issues](https://gitee.com/Yummy-He/APMMC/issues){:target="_blank"}中提出建议、bug或其它需求。

## 本地开发

### 下载到本地
项目源码发布在[GitHub](https://github.com/Yummy-He/APMMC){:target="_blank"}、[Gitee](https://gitee.com/Yummy-He/APMMC){:target="_blank"}仓库，若只是想本地编译，可直接下载源码或使用`git clone`到本地。

若想参与本项目，可先在GitHub、Gitee将项目fork到自己的仓库，再`git pull`到本地；开发后push到自己的仓库，再向我的仓库提交`pull request`。

### 本地编译

LaTeX、Python环境配置不再赘述。

#### 安装Pygments

本文档中，使用了tcolorbox、minted宏包，用于配置展示代码的环境。其中minted宏包依赖于Python的Pygments包。

在电脑上有Python和pip的情况下，终端运行下面命令，安装Pygments：

```bash
pip install Pygments
```

在Linux中最好加上sudo提权。

```bash
sudo pip install Pygments
```

若有类似如下的报错：

```text
error: externally-managed-environment

× This environment is externally managed
╰─> To install Python packages system-wide, try apt install
    python3-xyz, where xyz is the package you are trying to
    install.

    If you wish to install a non-Debian-packaged Python package,
    create a virtual environment using python3 -m venv path/to/venv.
    Then use path/to/venv/bin/python and path/to/venv/bin/pip. Make
    sure you have python3-full installed.

    If you wish to install a non-Debian packaged Python application,
    it may be easiest to use pipx install xyz, which will manage a
    virtual environment for you. Make sure you have pipx installed.

    See /usr/share/doc/python3.12/README.venv for more information.

note: If you believe this is a mistake, please contact your Python installation or OS distribution provider. You can override this, at the risk of breaking your Python installation or OS, by passing --break-system-packages.
hint: See PEP 668 for the detailed specification.
```

按照提示在终端输入以下命令继续安装：

```bash
pip install Pygments --break-system-packages
```

Linux中最好加上sudo提权。

接下来按照提示继续安装即可。

#### 字体配置
本文档使用了宋体、楷体、思源宋体、Times New Roman、Maple字体，所用字体在本项目库`\dependency\fonts\`里提供，需安装所有字体后才能正常编译。

