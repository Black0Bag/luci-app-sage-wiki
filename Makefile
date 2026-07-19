# LuCI 界面支持包：为 sage-wiki 提供 Web 管理界面

include $(TOPDIR)/rules.mk

LUCI_NAME:=luci-app-sage-wiki
LUCI_TITLE:=sage-wiki LuCI 管理界面
LUCI_DEPENDS:=+luci-base +sage-wiki
LUCI_PKGARCH:=all

PKG_LICENSE:=MIT
PKG_VERSION:=1.0.0
PKG_RELEASE:=1
PKG_MAINTAINER:=Black0Bag

# 独立 feed 仓库：luci.mk 位于本仓库根目录
# 使用方式：
#   1. 在 feeds.conf.custom 中添加：src-link sage-wiki /path/to/this/repo
#   2. 或者作为子目录放入已有 luci feed 的 applications/ 下
# 如果作为独立 feed 使用，请确保 luci.mk 可被 include ../../luci.mk 找到
include ../../luci.mk

# call BuildPackage - OpenWrt buildroot signature
