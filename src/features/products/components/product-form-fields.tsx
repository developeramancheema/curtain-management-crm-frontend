'use client';

import type { ReactNode } from 'react';
import type {
  Control,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PRODUCT_CATEGORY_LABELS, PRODUCT_UNITS, formatInr } from '../utils';
import type { ProductFormData } from '../schemas';

interface ProductFormFieldsProps {
  register: UseFormRegister<ProductFormData>;
  control: Control<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
  sellingRate: number;
}

function ProductFormFields({
  register,
  control,
  errors,
  sellingRate,
}: ProductFormFieldsProps) {
  return (
    <div className="grid min-h-0 flex-1 gap-3 overflow-y-auto sm:grid-cols-2">
      <Field label="Product Name" error={errors.name?.message} className="sm:col-span-2">
        <Input id="name" placeholder="Plain Curtain Fabric" {...register('name')} />
      </Field>

      <Field label="SKU / Code" error={errors.sku?.message}>
        <Input id="sku" placeholder="PCF-1001" {...register('sku')} />
      </Field>

      <Field label="HSN Code" error={errors.hsnCode?.message}>
        <Input id="hsnCode" placeholder="5407" {...register('hsnCode')} />
      </Field>

      <Field label="Category" error={errors.category?.message}>
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(value) => {
                if (value) field.onChange(value);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue>{PRODUCT_CATEGORY_LABELS[field.value]}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {(
                  Object.keys(PRODUCT_CATEGORY_LABELS) as Array<
                    keyof typeof PRODUCT_CATEGORY_LABELS
                  >
                ).map((category) => (
                  <SelectItem key={category} value={category}>
                    {PRODUCT_CATEGORY_LABELS[category]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </Field>

      <Field label="Unit" error={errors.unit?.message}>
        <Controller
          control={control}
          name="unit"
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(value) => {
                if (value) field.onChange(value);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue>{field.value}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {PRODUCT_UNITS.map((unit) => (
                  <SelectItem key={unit} value={unit}>
                    {unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </Field>

      <Field label="Base Rate (₹)" error={errors.baseRate?.message}>
        <Input
          id="baseRate"
          type="number"
          min={0}
          step="0.01"
          {...register('baseRate', { valueAsNumber: true })}
        />
      </Field>

      <Field label="GST (%)" error={errors.gstPercent?.message}>
        <Input
          id="gstPercent"
          type="number"
          min={0}
          max={100}
          step="0.01"
          {...register('gstPercent', { valueAsNumber: true })}
        />
      </Field>

      <Field label="Selling Rate (₹)">
        <Input value={formatInr(sellingRate)} readOnly disabled />
      </Field>

      <Field label="Min. Order Qty" error={errors.minOrderQty?.message}>
        <Input
          id="minOrderQty"
          type="number"
          min={1}
          step={1}
          {...register('minOrderQty', { valueAsNumber: true })}
        />
      </Field>

      <Field label="Status" error={errors.status?.message}>
        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(value) => {
                if (value) field.onChange(value);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue>
                  {field.value === 'active' ? 'Active' : 'Inactive'}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </Field>

      <div className="flex items-center justify-between rounded-lg border px-3 py-2 sm:col-span-2">
        <div>
          <p className="text-sm font-medium">Stock Tracking</p>
          <p className="text-xs text-muted-foreground">
            Enable inventory tracking for this product
          </p>
        </div>
        <Controller
          control={control}
          name="stockTracking"
          render={({ field }) => (
            <Switch
              checked={field.value}
              onCheckedChange={(checked) => {
                if (typeof checked === 'boolean') field.onChange(checked);
              }}
            />
          )}
        />
      </div>

      <Field
        label="Product Description"
        error={errors.description?.message}
        className="sm:col-span-2"
      >
        <Textarea
          id="description"
          rows={3}
          placeholder="Describe the fabric, hardware, or service"
          {...register('description')}
        />
      </Field>

      <Field label="Notes" error={errors.notes?.message} className="sm:col-span-2">
        <Textarea
          id="notes"
          rows={2}
          placeholder="Internal notes"
          {...register('notes')}
        />
      </Field>
    </div>
  );
}

function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <Label className="mb-1.5">{label}</Label>
      {children}
      {error ? <p className="mt-1 text-sm text-destructive">{error}</p> : null}
    </div>
  );
}

export { ProductFormFields };
