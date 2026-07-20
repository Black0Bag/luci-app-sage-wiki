include $(TOPDIR)/rules.mk

PKG_NAME:=luci-app-sage-wiki
PKG_VERSION:=1.0.0
PKG_RELEASE:=2
PKG_LICENSE:=MIT
PKG_MAINTAINER:=Black0Bag
PKG_BUILD_PARALLEL:=1

LUCI_TITLE:=sage-wiki LuCI management interface
LUCI_PKGARCH:=all

# 当 sage-wiki 编译时未启用 webui，LuCI 端的"启用 Web UI"选项无实际效果，
# 通过 PKG_CONFIG_DEPENDS 让 menuconfig 在该情形下隐藏该选项，避免误导。
PKG_CONFIG_DEPENDS:= \
    CONFIG_SAGE_WIKI_WEBUI

define Package/luci-app-sage-wiki
  SECTION:=luci
  CATEGORY:=LuCI
  SUBMENU:=3. Applications
  TITLE:=$(LUCI_TITLE)
  DEPENDS:=+luci-base +sage-wiki
  PKGARCH:=$(LUCI_PKGARCH)
endef

define Package/luci-app-sage-wiki/description
  LuCI web interface for sage-wiki, an LLM-compiled personal knowledge
  base. Provides service enable/disable, port, LLM provider, API key,
  base_url and model configuration. Simplified Chinese translation is
  built and shipped via the standard luci.mk i18n flow.
endef

# 走标准 luci.mk 流程：自动处理
#   - ./po/*/$(PKG_NAME).po 编译为 .lmo 并打包为 luci-i18n-sage-wiki-<lang>
#   - ./htdocs/luci-static/.../ 下静态资源安装到 www/luci-static/...
#   - ./root/usr/share/luci/menu.d/*.json 菜单与 acl.d/*.json ACL 安装
# 见 feeds/luci/luci.mk
include $(TOPDIR)/feeds/luci/luci.mk

define Package/luci-app-sage-wiki/postinst
#!/bin/sh
[ -n "$$IPKG_INSTROOT" ] && exit 0
rm -f /tmp/luci-indexcache
exit 0
endef

define Package/luci-app-sage-wiki/postrm
#!/bin/sh
[ -n "$$IPKG_INSTROOT" ] && exit 0
rm -f /tmp/luci-indexcache
exit 0
endef

$(eval $(call BuildPackage,luci-app-sage-wiki))
