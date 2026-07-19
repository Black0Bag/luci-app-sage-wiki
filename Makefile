# LuCI 界面支持包:为 sage-wiki 提供 Web 管理界面
# 作为独立 feed 仓库,本 Makefile 不依赖 luci.mk
# 参考 immortalwrt/luci 的 luci.mk 核心逻辑,使用标准 package.mk

include $(TOPDIR)/rules.mk

PKG_NAME:=luci-app-sage-wiki
PKG_VERSION:=1.0.0
PKG_RELEASE:=1
PKG_LICENSE:=MIT
PKG_MAINTAINER:=Black0Bag
PKG_BUILD_PARALLEL:=1

LUCI_TITLE:=sage-wiki LuCI management interface
LUCI_PKGARCH:=all

define Package/luci-app-sage-wiki
  SECTION:=luci
  CATEGORY:=LuCI
  SUBMENU:=5. Applications
  TITLE:=$(LUCI_TITLE)
  DEPENDS:=+luci-base +sage-wiki
  PKGARCH:=$(LUCI_PKGARCH)
endef

define Package/luci-app-sage-wiki/description
  LuCI web interface for sage-wiki, an LLM-compiled personal knowledge
  base. Provides service enable/disable, port, LLM provider and API key
  configuration. Simplified Chinese translation included.
endef

# 纯前端 LuCI 应用,不需要编译
define Build/Prepare
endef

define Build/Configure
endef

define Build/Compile
endef

define Package/luci-app-sage-wiki/install
    $(INSTALL_DIR) $(1)/usr/share/luci/menu.d/
    $(INSTALL_DIR) $(1)/www/luci-static/resources/view/sage-wiki/

    $(INSTALL_DATA) ./root/usr/share/luci/menu.d/luci-app-sage-wiki.json \
        $(1)/usr/share/luci/menu.d/
    $(INSTALL_DATA) ./htdocs/luci-static/resources/view/sage-wiki/settings.js \
        $(1)/www/luci-static/resources/view/sage-wiki/
endef

define Package/luci-app-sage-wiki/postinst
#!/bin/sh
[ -n "$$IPKG_INSTROOT" ] && exit 0
# 确保 LuCI 资源目录存在并触发 CBI 缓存刷新
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
