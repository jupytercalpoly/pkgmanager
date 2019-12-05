import * as React from 'react';

import { ReactWidget, UseSignal } from '@jupyterlab/apputils'; 

import StyleClasses from './style';

import { PackageSearcher } from './PackageBar';

const PackageBarStyleClasses = StyleClasses.PackageBarStyleClasses;

export default class PInstallerWidget extends ReactWidget {
  constructor(notebookTracker: any) {
    super();
    this.notebookTracker = notebookTracker;
  }
  render() {
    let { currentWidget } = this.notebookTracker;
    currentWidget && currentWidget.session && currentWidget.session.ready.then(()=>{
      let { session } = currentWidget;
      console.log("PROPS.KERNELNAME", session.kernelDisplayName);
    });
    let { session } = currentWidget;
    return (
      <UseSignal signal={session.kernelChanged}>
        {() => 
          <div className={PackageBarStyleClasses.PIComponent}>
            <PackageSearcher 
              kernelId={session.kernelId} 
              nb = {this.notebookTracker}
              kernelName={session.kernelDisplayName} 
              uninstalledPackage={null}
              moduleError={null}
            />
          </div>
        }
      </UseSignal>
    );
  }
  private notebookTracker: any;
}