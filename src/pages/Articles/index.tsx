import { article } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import React, { useRef, useState } from 'react';
import { Link } from 'umi';

const columns: ProColumns<API.ArticleItem>[] = [
  {
    title: '区域',
    dataIndex: 'name',
  },
  {
    title: '图片数',
    dataIndex: 'picture',
    hideInSearch: true,
  },
  {
    title: '文字',
    dataIndex: 'words',
    hideInSearch: true,
  },
  {
    title: '链接',
    dataIndex: 'link',
    hideInSearch: true,
  },
  {
    title: '添加时间',
    dataIndex: 'created_at',
    hideInSearch: true,
  },
  {
    title: '查看次数',
    dataIndex: 'view',
    hideInSearch: true,
    sorter: true,
    render: (_, record) => <span>{record.view} 次</span>,
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href="/article/{record.id}" target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
    ],
  },
];

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState(false);
  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle="内容列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        columns={columns as ProColumns<API.RuleListItem, 'text'>[]}
        request={article}
        toolBarRender={() => [
          // eslint-disable-next-line react/jsx-key
          <Link to={'/articles/create'}>
            <PlusOutlined /> 添加
          </Link>,
        ]}
      />
    </PageContainer>
  );
};

export default TableList;
