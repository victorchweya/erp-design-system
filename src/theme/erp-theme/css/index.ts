import { controlSizes } from '../foundations/controls'

// PrimeVue 5.0.5 omits size variants for these widths and nested chip inputs. The default (md)
// size already gets its dropdown widths, addon sizes and paddings from component tokens that point
// at control.md.*, so for md only the values that have no token are set here.
const controlCss = [...controlSizes]
  .sort((a, b) => Number(b.key === 'md') - Number(a.key === 'md'))
  .map(({ key, size }) => {
    const suffix = key === 'md' ? '' : `-${key}`
    const sized = key !== 'md'
    return `
        ${
          sized
            ? ['select', 'multiselect', 'cascadeselect', 'treeselect']
                .map(
                  (component) => `
            .p-${component}${suffix} {
                --p-${component}-dropdown-width: var(--p-control-${key}-height);
            }
        `,
                )
                .join('')
            : ''
        }
        ${
          sized
            ? `.p-inputnumber:has(.p-inputtext${suffix}) {
            --p-inputnumber-button-width: var(--p-control-${key}-height);
            --p-inputnumber-button-vertical-padding: var(--p-control-${key}-padding-y);
        }
        .p-inputgroup:has(.p-inputfield${suffix}) {
            --p-inputgroup-addon-font-size: var(--p-control-${key}-font-size);
            --p-inputgroup-addon-padding: var(--p-control-${key}-padding-y);
            --p-inputgroup-addon-min-width: var(--p-control-${key}-height);
        }`
            : ''
        }
        .p-autocomplete${size ? `:has(> .p-inputtext-${key}, > .p-autocomplete-input-multiple[data-p~="${size}"])` : ''} {
            font-size: var(--p-control-${key}-font-size);
            --p-autocomplete-padding-x: var(--p-control-${key}-padding-x);
            --p-autocomplete-padding-y: var(--p-control-${key}-padding-y);
        }
        .p-multiselect${suffix} {
            min-height: var(--p-control-${key}-height);${sized ? `\n            --p-multiselect-padding-y: var(--p-control-${key}-padding-y);` : ''}
        }
        .p-inputtags${size ? `[data-p~="${size}"]` : ''} {${
          sized
            ? `\n            --p-inputtags-padding-x: var(--p-control-${key}-padding-x);\n            --p-inputtags-padding-y: var(--p-control-${key}-padding-y);`
            : ''
        }
            --p-chip-padding-y: calc(var(--p-control-${key}-padding-y) / 2);
            font-size: var(--p-control-${key}-font-size);
        }
    `
  })
  .join('')

const css = /*css*/ `
    ${controlCss}
    .p-multiselect .p-multiselect-label:has(.p-chip) {
        padding: calc(var(--p-multiselect-padding-y) / 2);
    }
    .p-inputtags:has(> .p-inputtags-item) {
        padding-inline: calc(var(--p-inputtags-padding-y) / 2);
    }
    /* Opt-in table footer: summary on the left, page-size label and controls on the right. */
    .erp-table-pagination > nav > .p-paginator {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        align-items: center;
    }
    .erp-table-pagination > nav > .p-paginator > .p-paginator-content-start {
        display: flex;
        width: 100%;
        min-width: 0;
    }
    :is(
        .p-button.p-button-sm,
        .p-component.p-inputfield-sm,
        .p-inputwrapper.p-component:has(> .p-inputtext-sm),
        .p-autocomplete.p-component:has(> .p-autocomplete-input-multiple[data-p~="small"]),
        .p-inputtags.p-component[data-p~="small"]
    ) {
        --p-icon-size: var(--p-font-size-xs);
    }
    :is(
        .p-button.p-button-sm,
        .p-component.p-inputfield-sm,
        .p-inputwrapper.p-component:has(> .p-inputtext-sm),
        .p-autocomplete.p-component:has(> .p-autocomplete-input-multiple[data-p~="small"]),
        .p-inputtags.p-component[data-p~="small"]
    ) .p-icon {
        font-size: var(--p-icon-size);
        width: var(--p-icon-size);
        height: var(--p-icon-size);
    }
    .p-button.p-button-icon-only {
        padding-inline: 0;
    }
    .p-autocomplete .p-autocomplete-input-chip input,
    .p-inputtags .p-autocomplete .p-autocomplete-input {
        font-size: inherit;
    }
    .p-inputtags .p-autocomplete {
        font-size: inherit;
    }
    .p-inputgroupaddon:has(> .p-button) {
        width: var(--p-inputgroup-addon-min-width);
    }
    .p-inputgroupaddon > .p-button {
        width: 100%;
        align-self: stretch;
        min-width: 0;
        border: 0;
        border-radius: 0;
    }
    .p-inputgroupaddon > .p-button:not(:disabled):is(:hover, :active) {
        border: 0;
    }
    .p-inputtags .p-inputtags-item .p-chip-label {
        line-height: inherit;
    }
    .p-toast-close-button {
        position: static;
    }
    .p-toast-message-content > div:has(> .p-toast-close-button) {
        flex: 0 0 auto;
    }
    .p-toast {
        width: min(var(--p-toast-width), calc(100vw - 2rem)) !important;
    }
    .p-confirmdialog {
        --p-dialog-header-padding: var(--p-spacing-5) var(--p-spacing-5) var(--p-spacing-3);
        --p-dialog-content-padding: 0 var(--p-spacing-5) var(--p-spacing-5);
        --p-dialog-footer-padding: 0 var(--p-spacing-5) var(--p-spacing-5);
    }
    .p-confirmdialog .p-dialog-content {
        align-items: flex-start;
    }
    .p-confirmdialog-icon {
        align-self: flex-start;
        flex: 0 0 auto;
    }
    .p-dialog:not(.p-confirmdialog) > .p-dialog-header,
    .p-drawer > .p-drawer-header {
        border-block-end: 1px solid var(--p-content-border-color);
    }
    .p-drawer > .p-drawer-footer {
        border-block-start: 1px solid var(--p-content-border-color);
    }

    li.p-autocomplete-option,
    div.p-cascadeselect-option-content,
    li.p-listbox-option,
    li.p-multiselect-option,
    li.p-select-option,
    li.p-listbox-option,
    div.p-tree-node-content,
    li.p-datatable-filter-constraint,
    .p-datatable .p-datatable-tbody > tr,
    .p-treetable .p-treetable-tbody > tr,
    div.p-menu-item-content,
    div.p-tieredmenu-item-content,
    div.p-contextmenu-item-content,
    div.p-menubar-item-content,
    div.p-megamenu-item-content,
    div.p-panelmenu-header-content,
    div.p-panelmenu-item-content,
    th.p-datatable-header-cell,
    th.p-treetable-header-cell,
    thead.p-datatable-thead > tr > th,
    .p-treetable thead.p-treetable-thead>tr>th {
        transition: none;
    }
`

export default css
