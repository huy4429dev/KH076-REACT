import $ from "jquery";
import "bootstrap-notify";

window.notify = function (message, type = "info", options = {}) {
    options = {
        icon: '',
        from: 'top',
        align: 'right',
        timer: 1000,
        delay: 1000,
        allow_dismiss: true,
        ...options
    };

    $.notify({
        icon: options.icon,
        message: message,
    }, {
        element: 'body',
        type: type || 'info',
        allow_dismiss: options.allow_dismiss,
        placement: {
            from: options.from,
            align: options.align
        },
        offset: {
            x: 20,
            y: 20
        },
        spacing: 10,
        z_index: 1100,
        delay: options.delay,
        timer: options.timer,
        url_target: '_blank',
        mouse_over: false,
        template: `
        <div data-notify="container" class="alert alert-dismissible alert-{0} alert--notify" role="alert">
            <span data-notify="title">{1}</span> 
            <span data-notify="message">{2}</span>
        </div>
        `,
        ...options,
    });
}
