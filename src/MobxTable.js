import React, { useEffect, useMemo, useState } from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Table, Tag, Space, Button } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react";

const SpecialColumn = observer(({ row }) => {
  console.log(row);
  return <span>{row.name}</span>;
});
const CheckedColumn = observer(({ row }) => {
  return (
    <Checkbox
      onChange={(evt) => {
        row.setChecked(evt.target.checked);
      }}
      checked={row.checked}
    />
  );
});
const CheckedHeader = observer(({ rows }) => {
  return (
    <Checkbox
      style={{ marginRight: "5px" }}
      checked={!rows.some((item) => !item.checked)}
      onChange={(evt) => {
        rows.forEach((item) => {
          item.setChecked(evt.target.checked);
        });
      }}
    />
  );
});
class Row {
  name = "";
  age = 0;
  address = "";
  key = "";
  checked = false;
  constructor(data) {
    this.name = data.name;
    this.age = data.age;
    this.address = data.address;
    this.key = data.key;
    this.tags = data.tags;
    this.checked = data.checked;
    makeAutoObservable(this);
  }
  setName(name) {
    this.name = name;
  }
  setChecked(checked) {
    this.checked = checked;
  }
}
export default function MobxTable() {
  const columns = [
    {
      title: "选择",
      dataIndex: "checked",
      key: "checked",
      render: (val, row) => {
        return <CheckedColumn row={row} />;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, row) => {
        return <SpecialColumn row={row}></SpecialColumn>;
      },
      shouldCellUpdate(record, preRecord) {
        console.log(record.name, preRecord.name);
        if (record.name !== preRecord.name) return true;
        return false;
      },
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      render(age) {
        console.log("age render");
        return age;
      },
      shouldCellUpdate(record, preRecord) {
        return false;
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const [data, setData] = useState([
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
      checked: false,
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
      checked: false,
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
      checked: false,
    },
  ]);
  const items = useMemo(() => {
    // debugger;
    return data.map((item) => {
      return new Row(item);
    });
  }, [data]);
  return (
    <div>
      <Table
        columns={columns}
        dataSource={items}
        components={{
          header: {
            cell: function (props) {
              if (props.children[1] === "选择") {
                let { children, ...left } = props;
                console.log("33");
                return (
                  <th {...left}>
                    <CheckedHeader rows={items} />
                    {children}
                  </th>
                );
              }
              return <th {...props}></th>;
            },
          },
        }}
      />
      <Button
        onClick={() => {
          items[0].setName(items[0].name + "+");
        }}
      >
        change name
      </Button>
    </div>
  );
}
