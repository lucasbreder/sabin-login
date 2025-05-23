function createForm(data, buttonLabel = 'Enviar') {
    const container = document.querySelector('form');
    
    data.forEach(item => {
        const label = document.createElement('label')
        const p = document.createElement('p')
        let input;
        if( item.type === 'select') {
            input = document.createElement('select') 
        } else if (item.type === 'textarea') {
            input = document.createElement('textarea') 
            input.setAttribute('placeholder', item.placeholder)
            
        } else {
            input = document.createElement('input')
        }
        input.setAttribute('type', item.type)
        input.setAttribute('name', item.name)
        {item.mask && input.addEventListener('keypress', (e) => { mask(e.target, item.mask)})}
        label.classList.add(item.name)
        label.classList.add(item.type)
        
        
        item.required && p.classList.add('required')
        item.required && input.setAttribute('required', item.required)
        item.maxlength && input.setAttribute('maxlength', item.maxlength)
        item.disabled && input.setAttribute('disabled', item.disabled)
        item.onChange && input.addEventListener('change', (e) => {item.onChange === 'showRevokeOptions()' && showRevokeOptions(e.target)})
        item.initialState === 'hide' && label.classList.add('hide')

        item.value ? input.value = item.value : ''
        
        item.type === 'file' && input.setAttribute('multiple', true)
        item.type === 'file' && item.accept && input.setAttribute('accept', item.accept)

        item.type === 'file' && input.addEventListener('change', (e) => {
            Array.from(e.target.files).forEach((file) => {
                const element = document.createElement('div')
                element.textContent = file.name
                input.after(element)
            })
          
        })
        p.textContent = item.label

        container.append(label)
        label.append(p)
        label.append(input)

        if(item.obs) {
            const obsContainer = document.createElement('div')
            obsContainer.classList.add('obs')
            obsContainer.textContent = item.obs
            label.append(obsContainer)
        }

        if(item.type === 'select') {
            item.options.forEach(option => {
                const optionItem = document.createElement('option')
                optionItem.setAttribute('value', option)
                optionItem.textContent = option
                input.append(optionItem)
            })
        }

        
    });
    const button = document.createElement('button')
    button.innerText = buttonLabel
    container.append(button)
    hideLoading()
}