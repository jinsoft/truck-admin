import { Request, Response } from 'express';
import moment from 'moment';

// mock tableListDataSource
const genList = (current: number, pageSize: number) => {
  const tableListDataSource: API.ArticleItem[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    tableListDataSource.push({
      id: i + 1,
      name: 'ainiok',
      picture: 3,
      words: 300,
      link: 10,
      created_at: moment().format('YYYY-MM-DD'),
      view: Math.ceil(Math.random() * 100),
    });
  }
  tableListDataSource.reverse();
  return tableListDataSource;
};

let tableListDataSource = genList(1, 100);

function getArticle(req: Request, res: Response) {
  const { current = 1, pageSize = 10 } = req.query;

  let dataSource = [...tableListDataSource].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );

  const result = {
    data: dataSource,
    total: tableListDataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${current}`, 10) || 1,
  };

  return res.json(result);
}

function postArticle(req: Request, res: Response) {
  const body = req.body;
  const { method, key } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter((item) => key.indexOf(item.id) === -1);
      break;
    case 'post':
      (() => {
        const i = Math.ceil(Math.random() * 10000);
        const newRule: API.ArticleItem = {
          id: i,
          name: '11111',
          picture: 0,
          words: 0,
          link: 0,
          created_at: '',
          view: 0,
        };
        tableListDataSource.unshift(newRule);
        return res.json(newRule);
      })();
      return;

    case 'update':
      return;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  res.json(result);
}

export default {
  'GET /api/article': getArticle,
  'POST /api/article': postArticle,
};
