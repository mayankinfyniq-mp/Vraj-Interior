<script setup>
/**
 * ContactView — enquiry form (PrimeVue) beside a dark studio card, then FAQs.
 */
import { reactive, ref } from 'vue'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Select from 'primevue/select'
import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'
import { useToast } from 'primevue/usetoast'
import { faqs, services, site } from '@/data/site'
import PageHero from '@/components/ui/PageHero.vue'
import RevealText from '@/components/ui/RevealText.vue'

const toast = useToast()
const sending = ref(false)

const form = reactive({
  name: '',
  phone: '',
  email: '',
  scope: null,
  message: '',
})

const scopes = [...services.map((s) => s.title), 'Not sure yet']
const activeFaq = ref(0)

const meta = [
  { label: 'Replies', value: 'Within a day' },
  { label: 'Studio', value: 'S.G. Highway' },
  { label: 'Visits', value: 'Mon – Sat' },
]

function submit() {
  if (!form.name || !form.phone || !form.message) {
    toast.add({
      severity: 'error',
      summary: 'Almost there',
      detail: 'Name, phone and a line about the project, please.',
      life: 4200,
    })
    return
  }
  sending.value = true
  window.setTimeout(() => {
    sending.value = false
    toast.add({
      severity: 'success',
      summary: 'Enquiry received',
      detail: `Thank you, ${form.name}. The studio will call you within a day.`,
      life: 5000,
    })
    form.name = ''
    form.phone = ''
    form.email = ''
    form.scope = null
    form.message = ''
  }, 900)
}
</script>

<template>
  <div>
    <PageHero
      title="Tell us about the site."
      note="Share the plan, the rooms and the date you move in. We reply within a working day."
      image="/images/pooja-04.jpg"
      :meta="meta"
    />

    <section class="section bg-porcelain">
      <div class="shell grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <!-- form -->
        <div class="panel-light rounded-[6px] p-6 shadow-soft md:p-10" v-reveal="{ y: 30 }">
          <div class="flex items-center gap-3">
            <span class="numbered text-gold-deep">Enquiry</span>
            <span class="h-px w-10 bg-ink/20" />
            <span class="eyebrow text-stone">Two minutes</span>
          </div>

          <h2 class="display-md mt-6">Start the conversation.</h2>

          <form class="mt-8 grid gap-5" @submit.prevent="submit">
            <div class="grid gap-5 sm:grid-cols-2">
              <label class="flex flex-col gap-2">
                <span class="text-[0.7rem] uppercase tracking-wider2 text-stone">Name</span>
                <InputText v-model="form.name" placeholder="Your name" />
              </label>
              <label class="flex flex-col gap-2">
                <span class="text-[0.7rem] uppercase tracking-wider2 text-stone">Phone</span>
                <InputText v-model="form.phone" placeholder="+91" />
              </label>
            </div>

            <div class="grid gap-5 sm:grid-cols-2">
              <label class="flex flex-col gap-2">
                <span class="text-[0.7rem] uppercase tracking-wider2 text-stone">Email</span>
                <InputText v-model="form.email" placeholder="Optional" />
              </label>
              <label class="flex flex-col gap-2">
                <span class="text-[0.7rem] uppercase tracking-wider2 text-stone">Scope</span>
                <Select
                  v-model="form.scope"
                  :options="scopes"
                  placeholder="What are we building?"
                  :showClear="true"
                />
              </label>
            </div>

            <label class="flex flex-col gap-2">
              <span class="text-[0.7rem] uppercase tracking-wider2 text-stone">Brief</span>
              <Textarea
                v-model="form.message"
                rows="5"
                autoResize
                placeholder="3BHK in Bopal — kitchen, hall and two bedrooms. Possession in October."
              />
            </label>

            <div class="mt-2 flex flex-wrap items-center justify-between gap-4">
              <button type="submit" class="btn btn-ink" :disabled="sending" data-cursor="link">
                <span>{{ sending ? 'Sending…' : 'Send enquiry' }}</span>
                <i class="pi pi-arrow-right btn-arrow text-[0.72rem]" />
              </button>
              <p class="text-[0.72rem] uppercase tracking-wider2 text-stone">
                Or call {{ site.phone }}
              </p>
            </div>
          </form>
        </div>

        <!-- studio card -->
        <aside class="flex flex-col gap-6">
          <div class="relative overflow-hidden rounded-[6px] bg-ink p-7 text-porcelain md:p-9" v-reveal="{ y: 30, delay: 0.08 }">
            <div class="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-emerald/30 blur-[90px]" />
            <p class="eyebrow text-gold">The studio</p>
            <ul class="mt-7 space-y-5 text-[0.92rem] font-light text-porcelain/75">
              <li class="flex gap-3">
                <i class="pi pi-map-marker mt-1 text-[0.8rem] text-gold" />
                <span>{{ site.address }}</span>
              </li>
              <li class="flex gap-3">
                <i class="pi pi-phone mt-1 text-[0.8rem] text-gold" />
                <a :href="site.phoneHref" class="transition-colors hover:text-porcelain">{{ site.phone }}</a>
              </li>
              <li class="flex gap-3">
                <i class="pi pi-envelope mt-1 text-[0.8rem] text-gold" />
                <a :href="`mailto:${site.email}`" class="transition-colors hover:text-porcelain">{{ site.email }}</a>
              </li>
              <li class="flex gap-3">
                <i class="pi pi-clock mt-1 text-[0.8rem] text-gold" />
                <span>{{ site.hours }}</span>
              </li>
            </ul>

            <div class="mt-8 flex flex-wrap gap-3">
              <a :href="site.whatsapp" target="_blank" rel="noreferrer" class="btn btn-gold !px-5 !py-3" data-cursor="link">
                <i class="pi pi-whatsapp text-[0.8rem]" />
                <span>WhatsApp</span>
              </a>
              <a
                :href="`https://maps.google.com/?q=${encodeURIComponent(site.address)}`"
                target="_blank"
                rel="noreferrer"
                class="btn btn-ghost-light !px-5 !py-3"
                data-cursor="link"
              >
                <span>Open in maps</span>
              </a>
            </div>
          </div>

          <!-- map plate -->
          <div class="relative overflow-hidden rounded-[6px] border border-ink/10 bg-white" v-reveal="{ y: 24, delay: 0.14 }">
            <div
              class="h-44 w-full bg-[radial-gradient(circle_at_30%_30%,rgba(195,161,90,0.18),transparent_55%),radial-gradient(circle_at_70%_70%,rgba(15,74,62,0.16),transparent_55%)]"
            />
            <div class="absolute inset-0 grid place-items-center">
              <div class="flex items-center gap-3 rounded-full bg-white/85 px-5 py-2.5 backdrop-blur">
                <span class="h-1.5 w-1.5 animate-breathe rounded-full bg-gold" />
                <span class="text-[0.7rem] uppercase tracking-wider2 text-ink">{{ site.city }}, Gujarat</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <!-- faqs -->
    <section class="section bg-white">
      <div class="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <div class="flex items-center gap-3" v-reveal="{ y: 14 }">
            <span class="numbered text-gold-deep">FAQ</span>
            <span class="h-px w-10 bg-ink/20" />
            <span class="eyebrow text-stone">Before you ask</span>
          </div>
          <RevealText text="The four questions everyone starts with." tag="h2" class="display-lg mt-6 block max-w-[18ch]" />
        </div>

        <Accordion v-model:value="activeFaq" class="w-full">
          <AccordionPanel v-for="(faq, i) in faqs" :key="faq.q" :value="i">
            <AccordionHeader>{{ faq.q }}</AccordionHeader>
            <AccordionContent>
              <p>{{ faq.a }}</p>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </div>
    </section>
  </div>
</template>
