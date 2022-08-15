---
title: Bare repository in Git
date: 2022-03-04 16:19:05
description: 使用github自带的export功能导出了意料之外的目录
author: ri1ken
---

想着给github上不再维护的repos做一个本地和 [mega](https://mega.nz) 上的备份，于是使用了主页上的 `Settings -> Account -> Export account data` 功能，预想着可以一键将源代码全部拷贝到本地，才发现 `/repositories/{username}` 目录下的以 `{project_name}.git` 命名的文件夹下并没有工作区,只有一堆配置文件和内置脚本，事实上这个目录和执行 `git init` 命令时生成的 `.git` 目录几乎是同一个东西，在git官方文档中被称为 [Bare repository](https://git-scm.com/book/en/v2/Git-on-the-Server-Getting-Git-on-a-Server)（裸仓库）。

### 和默认仓库的区别

当我们运行 `git init` 时，git会在当前目录下创建一个 `.git`目录：
```bash
❯ git init 
❯ tree -a .
.
├── .DS_Store
└── .git
    ├── HEAD
    ├── config
    ├── description
    ├── hooks
    │   ├── applypatch-msg.sample
    │   ├── commit-msg.sample
    │   ├── fsmonitor-watchman.sample
    │   ├── post-update.sample
    │   ├── pre-applypatch.sample
    │   ├── pre-commit.sample
    │   ├── pre-merge-commit.sample
    │   ├── pre-push.sample
    │   ├── pre-rebase.sample
    │   ├── pre-receive.sample
    │   ├── prepare-commit-msg.sample
    │   ├── push-to-checkout.sample
    │   └── update.sample
    ├── info
    │   └── exclude
    ├── objects
    │   ├── info
    │   └── pack
    └── refs
        ├── heads
        └── tags

9 directories, 18 files
```
这里包含了git为当前仓库记录的所有配置信息，包括每次commit提交时的hash值，代码的增删记录等。和 `.git` 同级的其余目录和文件则属于工作区，git可以聪明地发现我们对工作区的每一次修改，并且支持使用 `git commit`，`git add`，`git log` 等命令记录每一次提交。

然而，当你试图使用 `git init --bare example-repo.git` 来初始化一个名为“example-repo.git”的目录时：
```
❯ git init --bare example-repo.git
❯ cd example-repo.git
❯ tree -a .
.
├── HEAD
├── config
├── description
├── hooks
│   ├── applypatch-msg.sample
│   ├── commit-msg.sample
│   ├── fsmonitor-watchman.sample
│   ├── post-update.sample
│   ├── pre-applypatch.sample
│   ├── pre-commit.sample
│   ├── pre-merge-commit.sample
│   ├── pre-push.sample
│   ├── pre-rebase.sample
│   ├── pre-receive.sample
│   ├── prepare-commit-msg.sample
│   ├── push-to-checkout.sample
│   └── update.sample
├── info
│   └── exclude
├── objects
│   ├── info
│   └── pack
└── refs
    ├── heads
    └── tags

8 directories, 17 files
```
你会发现它与默认情况下 `.git` 里的目录结构完全一致，唯一不同的是它不是被封装在隐藏文件夹下，而是作为主体部分存在于这个名为“example-bare.git”的文件夹下。这个裸仓库不具有工作区，因此不能进行commit，add等操作，只可以对其使用 `git push` 和 `git clone`操作，这也是裸仓库被设计出来的初衷——作为一个远端的可供外部访问的中心仓库。一个中心仓库应当是唯一的，一致的，因此git禁止了对一个non-bare型仓库进行push操作的原因，因为这会造成各个non-bare仓库之间working tree的不一致。

回想Github给我提供的HTTPS Clone方式，如 `git clone https://github.com/Kiotlin/workshop.guide.git`，同样是一个指向bare仓库的https链接，也就是Github为我们的项目代码托管了其对应的bare仓库，这样对于一个开源项目，世界上的任何人都可以通过Github上托管的这个中心仓库来为自己创建一个本地版本。

简单来说，你只需要为你的仓库创建对应的bare仓库，然后通过某种方式将其储存到你的远端服务器上：
```
❯ git clone --bare my_project my_project.git
Cloning into bare repository 'my_project.git'...
done.
❯ scp my_project.git user@git.example.com:/src/git
```
例如，这里我们以user的身份将 `my_project.git` 发送到 `git.example.com` 的 `/src/git` 目录下之后，我们就可以将其工作区版本clone到本地：
```
❯ git clone user@git.example.com:/src/git/my_project.git
```
同样，如果该user具有写入权限，你同样可以把你的修改再次push到服务器端。

### 后记

事后再回头过来看Github上的这个Export行为，事实上这个备份并不一定是安全的，至少我觉得如果明天Github删库倒闭了，这个中心仓库也同样会随之失效，所以保险起见你应该维护自己的代码托管服务器，如 [Gitlab](https://about.gitlab.com/install/) 等，并将你项目仓库对应的bare仓库迁移到这个新的托管服务器上。