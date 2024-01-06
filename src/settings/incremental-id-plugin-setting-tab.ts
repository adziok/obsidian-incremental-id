import { PluginSettingTab, Setting } from 'obsidian';
import { Logger } from '../utils';
import { IncrementalIdPlugin } from '../incremental-id-plugin';
import { IncrementalIdConfiguration } from '../configuration/incremental-id-configuration';
import { isIdDefinitionValid } from './is-id-definition-valid';
import { IdDefinition } from '../types';

export class IncrementalIdPluginSettingTab extends PluginSettingTab {
  constructor(
    private plugin: IncrementalIdPlugin,
    private config: IncrementalIdConfiguration,
  ) {
    super(app, plugin);
  }

  addAddIdDefinitionSection() {
    let tempIdDefinition: IdDefinition = {
      prefix: '',
      currentIteration: 0,
      name: '',
      separator: '-',
      leadingZeros: {
        enabled: false,
        numberOfZeros: 8,
      },
    };

    const s = new Setting(this.containerEl)
      .addText((cb) => {
        cb.setPlaceholder('Provide name for your ID')
          .setValue(tempIdDefinition.name)
          .onChange(async (newIdName: string) => {
            tempIdDefinition.name = newIdName;
          });
      })
      .addText((cb) => {
        cb.setPlaceholder('Provide prefix for your ID, only uppercase letters allowed')
          .setValue(tempIdDefinition.prefix)
          .onChange(async (newPrefix: string) => {
            tempIdDefinition.prefix = newPrefix;
          });
      })
      .addText((cb) => {
        cb.setPlaceholder('Provide separator for your ID').onChange(async (separator: string) => {
          tempIdDefinition.separator = separator;
        });
      })
      .addText((cb) => {
        cb.setPlaceholder('Provide current iteration for your ID')
          .setValue(tempIdDefinition.currentIteration.toString())
          .onChange(async (newIdIteration: string) => {
            tempIdDefinition.currentIteration = Number(newIdIteration);
          });
      })
      .addToggle((cb) => {
        cb.setTooltip('Enable leading zeros')
          .setValue(tempIdDefinition.leadingZeros.enabled)
          .onChange(async (enabled: boolean) => {
            tempIdDefinition.leadingZeros.enabled = enabled;
          });
      })
      .addText((cb) => {
        cb.setPlaceholder('Provide number of zeros between 0-64 for your ID')
          .setValue(tempIdDefinition.leadingZeros.numberOfZeros.toString())
          .onChange(async (separator: string) => {
            tempIdDefinition.leadingZeros.numberOfZeros = Number(separator);
          });
      })
      .addButton((cb) => {
        cb.setButtonText('Add new ID definition')
          .setCta()
          .onClick(async () => {
            if (!isIdDefinitionValid(tempIdDefinition, this.config.configuration.idDefinitions)) {
              return;
            }
            this.config.configuration.idDefinitions.push(tempIdDefinition);
            this.plugin.commandHandler.add(null, tempIdDefinition);
            tempIdDefinition = {
              prefix: '',
              currentIteration: 0,
              name: '',
              separator: '-',
              leadingZeros: {
                enabled: false,
                numberOfZeros: 8,
              },
            };

            await this.config.save();
            // Force refresh
            this.display();
          });
      });
    s.infoEl.remove();
    s.settingEl.style.border = '2px solid #000000';
    s.settingEl.style.padding = '4px';
    s.settingEl.style.marginBottom = '4px';
    s.controlEl.style.display = 'flex';
    s.controlEl.style.flexWrap = 'wrap';
    s.controlEl.style.justifyContent = 'flex-start';
  }

  addIdDefinitionSettingsSection(): void {
    this.containerEl.createEl('h2', { text: 'Provide your IDs' });

    const desc = document.createDocumentFragment();
    desc.append('Particular IDs allow you to have a few separated IDs for different types of notes.');
    new Setting(this.containerEl).setDesc(desc);

    const fieldsDesc = document.createDocumentFragment();
    fieldsDesc.append(
      'Options: Name, prefix, separator, current iteration, enable leading zeros, number of leading zeros',
    );
    new Setting(this.containerEl).setDesc(fieldsDesc);

    const leadingZerosDesc = document.createDocumentFragment();
    leadingZerosDesc.append(
      'Leading zeros generate zeros before current iteration, for example: CD-00000001, CD-00000002, CD-00000003',
    );
    new Setting(this.containerEl).setDesc(leadingZerosDesc);

    this.config.configuration.idDefinitions.forEach((idDefinition, index) => {
      const s = new Setting(this.containerEl)
        .addText((cb) => {
          cb.setPlaceholder('Provide name for your ID')
            .setValue(idDefinition.name)
            .onChange(async (newIdName: string) => {
              if (newIdName && this.config.configuration.idDefinitions.find(({ name }) => name === newIdName)) {
                Logger.error(new Error('You need provide unique name'));
                return;
              }
              const updated: IdDefinition = {
                ...this.config.configuration.idDefinitions[index],
                name: newIdName,
              };
              this.plugin.commandHandler.add(this.config.configuration.idDefinitions[index], updated);
              this.config.configuration.idDefinitions[index] = updated;
              await this.config.save();
            });
        })
        .addText((cb) => cb.setDisabled(true).setValue(idDefinition.prefix))
        .addText((cb) => cb.setDisabled(true).setValue(idDefinition.separator))
        .addText((cb) => cb.setDisabled(true).setValue(idDefinition.currentIteration.toString()))
        .addText((cb) => cb.setDisabled(true).setValue(idDefinition.leadingZeros.numberOfZeros.toString()))
        .addToggle((cb) => cb.setDisabled(true).setValue(idDefinition.leadingZeros.enabled))
        .addButton((cb) => {
          cb.setButtonText('Delete')
            .setCta()
            .onClick(async () => {
              this.config.configuration.idDefinitions.splice(index, 1);
              await this.config.save();
              this.plugin.commandHandler.remove(this.config.configuration.idDefinitions[index]);

              this.display();
            });
        });
      s.infoEl.remove();
      s.settingEl.style.border = '2px solid #000000';
      s.settingEl.style.padding = '4px';
      s.settingEl.style.marginBottom = '4px';
      s.controlEl.style.display = 'flex';
      s.controlEl.style.flexWrap = 'wrap';
      s.controlEl.style.justifyContent = 'flex-start';
    });
  }

  display() {
    this.containerEl.empty();
    this.addIdDefinitionSettingsSection();
    this.addAddIdDefinitionSection();
  }
}
