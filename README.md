# luci-app-sage-wiki

[LuCI](https://github.com/immortalwrt/luci) 界面支持包,为 [sage-wiki](https://github.com/xoai/sage-wiki) 提供 ImmortalWrt/OpenWrt Web 管理界面。

## 功能

- 📋 **服务开关**:在 LuCI 中一键启停 sage-wiki
- ⚙️ **配置管理**:可视化配置 LLM 服务商、API Key、端口等
- 🔑 **密钥保护**:API Key 以密码框形式显示,不泄露
- 🇨🇳 **简体中文优先**:界面与文档均以简体中文为基础

## 截图

(待补充)

## 使用方法

### 添加到 feeds

```bash
echo "src-git luci_app_sage_wiki https://github.com/Black0Bag/luci-app-sage-wiki.git main" >> feeds.conf
./scripts/feeds update luci_app_sage_wiki
./scripts/feeds install luci-app-sage-wiki
```

### 编译

```bash
make menuconfig   # LuCI → Applications → luci-app-sage-wiki
make package/luci-app-sage-wiki/compile V=s
```

### 配置路径

安装后在 LuCI 管理界面访问:

```
服务 → sage-wiki 知识库
```

## 依赖

- `luci-base`
- `sage-wiki`(服务包)

## 许可证

MIT
