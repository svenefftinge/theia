
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

import { injectable } from 'inversify';
import { VSCodeExtensionRaw, VSCodeExtensionsLocation } from './vscode-extensions-types';
import { Emitter } from '@theia/core';

@injectable()
export class VSCodeExtensionsModel {
    protected readonly extensionsChangedEmitter = new Emitter<void>();
    readonly onExtensionsChanged = this.extensionsChangedEmitter.event;

    protected _registryExtensions: VSCodeExtensionRaw[] = [];
    protected _installedExtensions: VSCodeExtensionRaw[] = [];

    set registryExtensions(registryExtensions: VSCodeExtensionRaw[]) {
        this._registryExtensions = registryExtensions;
        this.extensionsChangedEmitter.fire(undefined);
    }

    set installedExtensions(installedExtensions: VSCodeExtensionRaw[]) {
        this._installedExtensions = installedExtensions;
        this.extensionsChangedEmitter.fire(undefined);
    }

    getExtensionsByLocation(location: VSCodeExtensionsLocation): VSCodeExtensionRaw[] {
        switch (location) {
            case 'registry': return this._registryExtensions;
            case 'installed': return this._installedExtensions;
            default: return [];
        }
    }
}
