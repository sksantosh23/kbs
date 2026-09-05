const form = document.querySelector('[data-intake-form]');
const select = form?.querySelector('[data-type-select]');
const target = form?.querySelector('[data-specific]');
const fields = {
  GOVERNMENT: [['acquisition_type', 'Acquisition / opportunity type', 'select'], ['due_date', 'Response / due date (if applicable)', 'date']],
  SUPPLIER: [['supplier_type', 'Supplier type', 'text'], ['capabilities', 'Capabilities / categories', 'textarea'], ['operating_region', 'Operating region', 'text'], ['website', 'Website (if applicable)', 'url']],
  TEAMING: [['geographic_coverage', 'Geographic coverage', 'text'], ['business_information', 'Voluntary relevant business information', 'textarea'], ['partnership_interest', 'Partnership interest', 'textarea']],
  IOT_CONNECTED_SYSTEMS: [['device_context', 'Device / system context', 'textarea'], ['desired_outcome', 'Desired outcome', 'textarea']],
  SERVICE: [['timing', 'Desired start / timing', 'text']],
  LOGISTICS: [['timing', 'Desired timing', 'text']],
  TECHNOLOGY: [['desired_outcome', 'Desired outcome', 'textarea']]
};
const requiredFields = new Set(['acquisition_type', 'device_context', 'desired_outcome', 'timing']);
const acquisitionOptions = ['RFQ', 'RFP', 'RFI', 'RFC', 'FFP', 'SOLICITATION', 'CONTRACT', 'SUBCONTRACT', 'TEAMING', 'OTHER'];
function render() {
  if (!target || !select) return;
  target.innerHTML = '';
  for (const [name, label, kind] of (fields[select.value] || [])) {
    const wrapper = document.createElement('label'); wrapper.textContent = label;
    const control = kind === 'textarea' ? document.createElement('textarea') : kind === 'select' ? document.createElement('select') : document.createElement('input');
    control.name = name; control.required = requiredFields.has(name); control.maxLength = kind === 'textarea' ? 2000 : 254;
    if (kind === 'date' || kind === 'url') control.type = kind;
    if (kind === 'select') for (const option of acquisitionOptions) { const item = document.createElement('option'); item.value = option; item.textContent = option; control.append(item); }
    wrapper.append(control); target.append(wrapper);
  }
}
select?.addEventListener('change', () => { const hidden = form?.querySelector('input[name="type"]'); if (hidden && select) hidden.value = select.value; render(); });
render();
