import React from 'react'
import { Route } from 'react-router'
import Main from './features/Main'
import NotFound from './features/NotFound'

export default (
    <div>
        <Route path="/" component={Main} />
        <Route path="main" component={Main} />
        <Route path="*" component={NotFound} />
    </div>
)
