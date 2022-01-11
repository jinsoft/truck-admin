import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button } from 'antd';
import React, { useRef } from 'react';

type ArticleItem = {
  id: number;
  name: string;
  picture: number;
  words: number;
  link: number;
  created_at: string;
  view: number;
};

const columns: ProColumns<ArticleItem>[] = [
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
  },
];

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
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
        toolBarRender={() => [
          <Button type="primary" key="primary" href="/articles/create">
            <PlusOutlined /> 添加
          </Button>,
        ]}
      />
    </PageContainer>
  );
};

export default TableList;
