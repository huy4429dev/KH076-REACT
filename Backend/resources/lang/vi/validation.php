<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    |  following language lines contain  default error messages used by
    |  validator class. Some of se rules have multiple versions such
    | as  size rules. Feel free to tweak each of se messages here.
    |
    */

    'accepted' => ' :attribute phải có accepted.',
    'active_url' => ' :attribute không tồn tại URL.',
    'after' => ' :attribute phải có a date after :date.',
    'after_or_equal' => ' :attribute phải có a date after or equal to :date.',
    'alpha' => ' :attribute may only contain letters.',
    'alpha_dash' => ' :attribute may only contain letters, numbers, dashes và underscores.',
    'alpha_num' => ' :attribute may only contain letters và numbers.',
    'array' => ' :attribute phải có an array.',
    'before' => ' :attribute phải có a date before :date.',
    'before_or_equal' => ' :attribute phải có a date before or equal to :date.',
    'giữa' => [
        'numeric' => ' :attribute phải có giữa :min và :max.',
        'file' => ' :attribute phải có giữa :min và :max kilobytes.',
        'string' => ' :attribute phải có giữa :min và :max kí tự.',
        'array' => ' :attribute phải có giữa :min và :max items.',
    ],
    'boolean' => ' :attribute field phải có true or false.',
    'confirmed' => ' :attribute không trùng khớp.',
    'date' => ' :attribute không tồn tại date.',
    'date_equals' => ' :attribute phải có a date equal to :date.',
    'date_format' => ' :attribute does not match  format :format.',
    'different' => ' :attribute và :or phải có different.',
    'digits' => ' :attribute phải có :digits digits.',
    'digits_giữa' => ' :attribute phải có giữa :min và :max digits.',
    'dimensions' => ' :attribute không có giá tri.',
    'distinct' => ' :attribute field has a duplicate value.',
    'email' => ' :attribute phải là địa chỉ email tồn tại.',
    'ends_with' => ' :attribute must end with one of  following: :values.',
    'exists' => ' selected :attribute không tồn tại.',
    'file' => ' :attribute phải có a file.',
    'filled' => ' :attribute field phải có a value.',
    'gt' => [
        'numeric' => ' :attribute phải có greater than :value.',
        'file' => ' :attribute phải có greater than :value kilobytes.',
        'string' => ' :attribute phải có greater than :value kí tự.',
        'array' => ' :attribute phải có more than :value items.',
    ],
    'gte' => [
        'numeric' => ' :attribute phải có greater than or equal :value.',
        'file' => ' :attribute phải có greater than or equal :value kilobytes.',
        'string' => ' :attribute phải có greater than or equal :value kí tự.',
        'array' => ' :attribute phải có :value items or more.',
    ],
    'image' => ' :attribute phải có an image.',
    'in' => ' selected :attribute không tồn tại.',
    'in_array' => ' :attribute field does not exist in :or.',
    'integer' => ' :attribute phải có an integer.',
    'ip' => ' :attribute phải có a valid IP address.',
    'ipv4' => ' :attribute phải có a valid IPv4 address.',
    'ipv6' => ' :attribute phải có a valid IPv6 address.',
    'json' => ' :attribute phải có a valid JSON string.',
    'lt' => [
        'numeric' => ' :attribute phải có less than :value.',
        'file' => ' :attribute phải có less than :value kilobytes.',
        'string' => ' :attribute phải có less than :value kí tự.',
        'array' => ' :attribute phải có less than :value items.',
    ],
    'lte' => [
        'numeric' => ' :attribute phải có less than or equal :value.',
        'file' => ' :attribute phải có less than or equal :value kilobytes.',
        'string' => ' :attribute phải có less than or equal :value kí tự.',
        'array' => ' :attribute must not have more than :value items.',
    ],
    'max' => [
        'numeric' => ' :attribute may not be greater than :max.',
        'file' => ' :attribute may not be greater than :max kilobytes.',
        'string' => ' :attribute may not be greater than :max kí tự.',
        'array' => ' :attribute may not have more than :max items.',
    ],
    'mimes' => ' :attribute phải có a file of type: :values.',
    'mimetypes' => ' :attribute phải có a file of type: :values.',
    'min' => [
        'numeric' => ' :attribute phải có at least :min.',
        'file' => ' :attribute phải có at least :min kilobytes.',
        'string' => ' :attribute phải có at least :min kí tự.',
        'array' => ' :attribute phải có at least :min items.',
    ],
    'multiple_of' => ' :attribute phải có a multiple of :value',
    'not_in' => ' selected :attribute không tồn tại.',
    'not_regex' => ' :attribute format không tồn tại.',
    'numeric' => ' :attribute phải có a number.',
    'password' => ' password is incorrect.',
    'present' => ' :attribute field phải có present.',
    'regex' => ' :attribute format không tồn tại.',
    'required' => ':attribute là bắt buộc',
    'required_if' => ' :attribute field is required when :or is :value.',
    'required_unless' => ' :attribute field is required unless :or is in :values.',
    'required_with' => ' :attribute field is required when :values is present.',
    'required_with_all' => ' :attribute field is required when :values are present.',
    'required_without' => ' :attribute field is required when :values is not present.',
    'required_without_all' => ' :attribute field is required when none of :values are present.',
    'same' => ' :attribute và :or must match.',
    'size' => [
        'numeric' => ':attribute phải có ít nhất :size.',
        'file' => ' :attribute phải có :size kilobytes.',
        'string' => ':attribute phải có :size kí tự.',
        'array' => ' :attribute must contain :size items.',
    ],
    'starts_with' => ' :attribute must start with one of  following: :values.',
    'string' => ' :attribute phải có a string.',
    'timezone' => ' :attribute phải có a valid zone.',
    'unique' => ' :attribute has already been taken.',
    'uploaded' => ' :attribute failed to upload.',
    'url' => ' :attribute format không tồn tại.',
    'uuid' => ' :attribute phải có a valid UUID.',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using
    | convention "attribute.rule" to name  lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    |  following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

    'attributes' => [],

];
