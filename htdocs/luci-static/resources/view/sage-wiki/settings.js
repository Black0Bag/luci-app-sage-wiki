'use strict';
'require form';
'require uci';
'require view';

// sage-wiki 设置页面
return view.extend({
    load: function() {
        return uci.load('sage-wiki');
    },

    render: function() {
        var m, s, o;

        // 表单
        m = new form.Map('sage-wiki', _('sage-wiki 知识库'), _(
            'sage-wiki 是 LLM 驱动的个人知识库,可自动将文档编译为结构化 Wiki。'
        ));

        // 设置区段
        s = m.section(form.TypedSection, 'main', _('基本设置'));
        s.anonymous = true;
        s.addremove = false;

        // 启用开关
        o = s.option(form.Flag, 'enabled', _('启用服务'), _(
            '勾选后 sage-wiki 将作为守护进程运行'
        ));
        o.rmempty = false;

        // 端口
        o = s.option(form.Value, 'port', _('监听端口'));
        o.datatype = 'port';
        o.placeholder = '3333';
        o.rmempty = false;

        // LLM Provider
        o = s.option(form.ListValue, 'provider', _('LLM 服务商'));
        o.value('gemini', _('Google Gemini'));
        o.value('openai', _('OpenAI'));
        o.value('anthropic', _('Anthropic Claude'));
        o.value('ollama', _('Ollama(本地)'));
        o.value('openai-compatible', _('OpenAI 兼容接口'));
        o.placeholder = 'gemini';

        // 模型名称
        o = s.option(form.Value, 'model', _('模型名称'), _(
            '留空则使用 Provider 默认模型'
        ));
        o.placeholder = 'gemini-2.5-flash';

        // API Key
        o = s.option(form.Value, 'api_key', _('API 密钥'));
        o.password = true;
        o.rmempty = true;

        // Web UI 开关
        o = s.option(form.Flag, 'webui', _('启用 Web UI'), _(
            '仅当二进制编译了 webui tag 时有效'
        ));
        o.rmempty = false;

        // 监听编译
        o = s.option(form.Flag, 'watch', _('监听文件变化'), _(
            '文档变化时自动重新编译 Wiki'
        ));
        o.rmempty = false;

        return m;
    },

    // 保存并应用
    handleSave: function(ev, mode) {
        var map = this.map;
        return map.save().then(function() {
            luci.get('init.d').then(function(initd) {
                initd.exec('sage-wiki', 'restart');
            });
        });
    }
});
