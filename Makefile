# LuCI 界面支持包:为 sage-wiki 提供 Web 管理界面

include $(TOPDIR)/rules.mk

LUCI_TITLE:=sage-wiki LuCI 管理界面
LUCI_DEPENDS:=+luci-base +sage-wiki
LUCI_PKGARCH:=all

PKG_LICENSE:=MIT
PKG_VERSION:=1.0.0
PKG_RELEASE:=1
PKG_MAINTAINER:=Black0Bag

include ../../luci.mk

# call BuildPackage - OpenWrt buildroot signature
