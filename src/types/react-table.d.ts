import '@tanstack/react-table'

declare module '@tanstack/table-core' {
    // https://tanstack.com/table/v8/docs/api/core/column-def#meta
    interface ColumnMeta {
        type?: 'checkbox'
    }
}
