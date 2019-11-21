/********************************************************************************
 * Copyright (C) 2019 TypeFox and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

import * as React from 'react';
import { ReactWidget } from '@theia/core/lib/browser/widgets';
import { injectable, interfaces, Container, inject, postConstruct } from 'inversify';

import { VSCodeExtensionsService } from '../../vscode-extensions-service';
import { VSCodeExtensionsModel } from '../../vscode-extensions-model';
import { VSCXList } from './vscx-list-component';

export const VSCodeExtensionsListOptions = Symbol('VSCodeExtensionsListOptions');
export interface VSCodeExtensionsListOptions {
    id: string;
    label: string;
}

@injectable()
export class VSCodeExtensionsListWidget extends ReactWidget {

    static createContainer(parent: interfaces.Container, options: VSCodeExtensionsListOptions): Container {
        const child = new Container({ defaultScope: 'Singleton' });
        child.parent = parent;
        child.bind(VSCodeExtensionsListOptions).toConstantValue(options);
        child.bind(VSCodeExtensionsListWidget).toSelf();
        return child;
    }
    static createWidget(parent: interfaces.Container, options: VSCodeExtensionsListOptions): VSCodeExtensionsListWidget {
        return VSCodeExtensionsListWidget.createContainer(parent, options).get(VSCodeExtensionsListWidget);
    }

    @inject(VSCodeExtensionsListOptions) protected readonly options: VSCodeExtensionsListOptions;
    @inject(VSCodeExtensionsService) protected readonly service: VSCodeExtensionsService;
    @inject(VSCodeExtensionsModel) protected readonly model: VSCodeExtensionsModel;

    @postConstruct()
    protected init(): void {
        this.id = 'vscode-extension-list:' + this.options.id;
        this.title.label = this.options.label;

        this.update();
    }

    protected render(): React.ReactNode {
        return <React.Fragment>
            <VSCXList model={this.model} service={this.service} />
        </React.Fragment>;
    }
}
