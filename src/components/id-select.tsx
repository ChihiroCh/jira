import { Select } from "antd";
import React from "react";

type SelectProps = React.ComponentProps<typeof Select>;
interface IdSelectProps
  extends Omit<SelectProps, "options" | "value" | "onChange"> {
  value: string | number | null | undefined;
  onChange: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}

/**
 * value可以传入多种类型的值
 * onChange只会回调number|undefined类型
 * 当isNaN(Number(value))为true的 时候，代表选择默认类型
 * 当选择默认类型的时候，onChange会回调undefined
 * @returns
 */
export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restprops } = props;
  return (
    <Select
      value={toNumber(value)}
      onChange={(value) => onChange(toNumber(value) || undefined)}
      {...restprops}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((item) => (
        <Select.Option key={item.id} value={item.id}>
          {item.name}
        </Select.Option>
      ))}
    </Select>
  );
};

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
