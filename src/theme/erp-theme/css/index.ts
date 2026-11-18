import { controlSizes } from '../foundations/controls'

// PrimeVue 5.0.5 omits size variants for these widths and nested chip inputs.
const controlCss = [...controlSizes]
  .sort((a, b) => Number(b.key === 'md') - Number(a.key === 'md'))
  .map(({ key, size }) => {
    const suffix = key === 'md' ? '' : `-${key}`
    return `
        ${['select', 'multiselect', 'cascadeselect', 'treeselect']
          .map(
            (component) => `
            .p-${component}${suffix} {
                --p-${component}-dropdown-width: var(--p-control-${key}-height);
            }
        `,
          )
          .join('')}
        .p-inputnumber:has(.p-inputtext${suffix}) {
            --p-inputnumber-button-width: var(--p-control-${key}-height);
            --p-inputnumber-button-vertical-padding: var(--p-control-${key}-padding-y);
        }
        .p-inputgroup:has(.p-inputfield${suffix}) {
            --p-inputgroup-addon-font-size: var(--p-control-${key}-font-size);
            --p-inputgroup-addon-padding: var(--p-control-${key}-padding-y);
            --p-inputgroup-addon-min-width: var(--p-control-${key}-height);
        }
        .p-autocomplete${size ? `:has(> .p-inputtext-${key}, > .p-autocomplete-input-multiple[data-p~="${size}"])` : ''} {
            font-size: var(--p-control-${key}-font-size);
            --p-autocomplete-padding-x: var(--p-control-${key}-padding-x);
            --p-autocomplete-padding-y: var(--p-control-${key}-padding-y);
        }
        .p-multiselect${suffix} {
            min-height: var(--p-control-${key}-height);
            --p-multiselect-padding-y: var(--p-control-${key}-padding-y);
        }
        .p-multiselect${suffix} .p-multiselect-label:has(.p-chip) {
            padding: calc(var(--p-control-${key}-padding-y) / 2) var(--p-control-${key}-padding-x);
        }
        .p-inputtags${size ? `[data-p~="${size}"]` : ''} {
            --p-inputtags-padding-x: var(--p-control-${key}-padding-x);
            --p-inputtags-padding-y: var(--p-control-${key}-padding-y);
            --p-chip-padding-y: calc(var(--p-control-${key}-padding-y) / 2);
            font-size: var(--p-control-${key}-font-size);
        }
    `
  })
  .join('')

const css = /*css*/ `
    ${controlCss}
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
    .p-inputgroupaddon > .p-button {
        border: 0;
    }
    .p-inputtags .p-inputtags-item .p-chip-label {
        line-height: inherit;
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
