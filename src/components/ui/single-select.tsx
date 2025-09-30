// components/ui/single-select.tsx
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { CheckIcon, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SingleSelectProps {
  options: Array<{ value: string; label: string }>;
  value: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SingleSelect({
  options,
  value,
  onChange,
  placeholder = 'Выберите...',
  className
}: SingleSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');

  const selectedOption = options.find((o) => o.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={cn('h-auto min-h-10 w-full justify-between', className)}
        >
          {selectedOption ? (
            <span>{selectedOption.label}</span>
          ) : (
            <span className='text-muted-foreground'>{placeholder}</span>
          )}
          <ChevronDown className='h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full p-0' align='start'>
        <Command>
          <CommandInput
            placeholder='Поиск...'
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>Ничего не найдено.</CommandEmpty>
            <CommandGroup>
              {/* Опция "Все" — если нужно */}
              <CommandItem
                key='all'
                onSelect={() => {
                  onChange('');
                  setOpen(false);
                }}
                className='cursor-pointer'
              >
                <div className='flex items-center'>
                  <CheckIcon
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === '' ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  Все
                </div>
              </CommandItem>
              <hr className='my-1 border-gray-200' />
              {options.map((option) => {
                const isSelected = value === option.value;
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                    className='cursor-pointer'
                  >
                    <div className='flex items-center'>
                      <CheckIcon
                        className={cn(
                          'mr-2 h-4 w-4',
                          isSelected ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      {option.label}
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
