/**
 * @name: antd 组件全局加载文件
 * @author: camellia
 * @email: guanchao_gc@qq.com
 * @date: 2020-12-30 15:06:19
 * @param:	data	type	description
 * @return:	data	type	description
 */
// This module only introduces components globally before login
import type { App } from 'vue';

import {
    // need
    Form,
    Input,
    Row,
    Col,
    Spin,
    Button,
    Menu,
    Space,
    Pagination,
    DatePicker,
    Checkbox,
    //   FormModel,
    Radio,
    Switch,
    TimePicker,
    TreeSelect,
    Upload,
    Avatar,
    Card,
    Empty,
    Table,
    Layout,
    List,
    Tabs,
    Tag,
    Tree,
    Modal,
    //   Message,
    Drawer,
    Progress,
    Tooltip,
    Collapse,
    Transfer,
    Select,
    Dropdown
} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

export function setupAntd(app: App<Element>) {
    // need
    // Here are the components required before registering and logging in
    app.use(Form)
        .use(Input)
        .use(Row)
        .use(Col)
        .use(Spin)
        .use(Menu)
        .use(Space)
        .use(Pagination)
        .use(DatePicker)
        .use(Checkbox)
        //   .use(FormModel)
        .use(Radio)
        .use(Switch)
        .use(TimePicker)
        .use(TreeSelect)
        .use(Upload)
        .use(Avatar)
        .use(Card)
        .use(Empty)
        .use(Table)
        .use(Layout)
        .use(List)
        .use(Tabs)
        .use(Tag)
        .use(Tree)
        .use(Modal)
        //   .use(Message)
        .use(Drawer)
        .use(Progress)
        .use(Tooltip)
        .use(Collapse)
        .use(Transfer)
        .use(Select)
        .use(Dropdown)
        .use(Button);
}