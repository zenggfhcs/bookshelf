<script setup>
import BookShelf from "@/icons/book-shelf.vue";
import Search from "@/icons/search.vue";
import {NButton, NCard, NFlex, NInput, NInputGroup, NLayout, NSpace,} from "naive-ui";

const props = defineProps(['updateMenuItem']);
{
	props.updateMenuItem('j-index');
}

</script>

<template>
		<n-flex class="m-t-16" justify="center">
			<n-flex class="w-60em items-center" vertical>
				<BookShelf class="w-10em h-10em"/>
				<div id="logo-text" class="logo-text line-height-1em font-size-4rem font-black v-c-n-text-color ">
					BookShelf
				</div>
				<n-input-group>
					<n-input size="large"/>
					<n-button ghost size="large" type="primary">
						<template #icon>
							<Search/>
						</template>
					</n-button>
				</n-input-group>
				<n-space class="max-w-50%">
					<router-link to="/j/index">
						<n-card class="max-w-max">
							高级检索
						</n-card>
					</router-link>
					<router-link to="/j/index">
						<n-card class="max-w-max">
							神秘的地方
						</n-card>
					</router-link>
				</n-space>
			</n-flex>
		</n-flex>
		<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consequatur delectus, distinctio dolores et,
			facere fugit hic incidunt ipsa itaque laudantium magnam maiores, minus modi obcaecati reprehenderit sequi!
			Perferendis, tempora!
		</div>
		<div>Animi aspernatur, atque autem consectetur consequatur dolorum enim exercitationem facere facilis harum hic
			incidunt ipsa laudantium minus nostrum officia, quae quia ratione vel velit veniam vero voluptas voluptatum? Hic,
			quae.
		</div>
		<div>Animi architecto beatae doloremque facilis, fugiat harum maiores maxime obcaecati, officiis perspiciatis placeat
			praesentium quam quisquam rerum saepe sequi tenetur, veritatis. Blanditiis cupiditate excepturi iste? Eos harum
			minus nihil praesentium.
		</div>
		<div>Dignissimos in minus officia recusandae? Alias beatae, eaque eligendi impedit magnam officiis porro quas qui.
			Deserunt dignissimos ducimus, error inventore ipsum laudantium officia possimus praesentium quam tempore totam vel
			voluptatum.
		</div>
		<div>Aperiam assumenda dolorem eaque iure optio quas repellat! Aut autem deleniti, doloribus ducimus expedita
			explicabo harum ipsam itaque nam nihil nisi, odio porro quaerat quas repellat, saepe velit voluptate voluptatem.
		</div>
		<div>Aspernatur distinctio dolor, dolorum eaque enim error harum id in minima officia, porro praesentium quibusdam
			recusandae rem repudiandae sapiente vero vitae! Eius expedita in incidunt, libero nostrum provident quas ratione!
		</div>
		<div>Adipisci aperiam earum itaque minus mollitia nulla quia reiciendis tempore voluptatibus. Consectetur corporis
			distinctio eligendi excepturi fugit hic ipsa ipsam minus nostrum quam suscipit tempora temporibus, voluptate.
			Laborum, quae, quod.
		</div>
		<div>A alias aperiam cumque deleniti, et eveniet exercitationem incidunt, libero non odio officia perferendis porro
			quaerat rerum similique soluta tempore voluptatum? Doloribus eos itaque iure laborum molestias officiis
			perferendis quibusdam.
		</div>
		<div>Ab aliquam assumenda at consectetur, cupiditate dolorum earum explicabo fuga minima natus obcaecati placeat,
			quia quo saepe sapiente sunt veritatis. Aliquid assumenda dolor eaque error reiciendis repellendus tempore veniam
			voluptates.
		</div>
		<div>Ab accusamus alias at atque dolor dolorem eaque ex harum impedit ipsa ipsam ipsum iste iure, labore laudantium
			libero maiores modi nisi nobis perspiciatis quas quasi saepe suscipit temporibus voluptate!
		</div>
		<div>Delectus totam ullam voluptatem? Aperiam asperiores at consequatur, culpa delectus dicta distinctio dolores
			earum expedita impedit iure libero maxime, nam numquam obcaecati quasi quibusdam quod recusandae rerum sapiente
			sit ullam.
		</div>
		<div>Animi architecto atque, dicta eaque error est fugiat illo ipsam laborum laudantium magni minima mollitia nobis,
			non numquam omnis possimus provident quae quo saepe sapiente sequi sit sunt ut voluptatibus!
		</div>
		<div>Dolor illum laudantium omnis quae quas vel, voluptatum! Accusantium alias amet, architecto, consequatur,
			corporis dignissimos est exercitationem facilis id itaque magnam minima modi recusandae reprehenderit repudiandae
			temporibus vel vitae voluptatem.
		</div>
		<div>Accusamus architecto at autem cum dolores ea enim ex excepturi exercitationem fugit harum illo in inventore
			itaque magnam magni molestias, odit officiis quia quo, soluta unde vero vitae voluptate voluptatum!
		</div>
		<div>Amet aperiam autem culpa cum delectus esse fugiat id illo in incidunt inventore labore libero, maxime molestias
			mollitia, nihil nisi officia pariatur porro praesentium quaerat qui quidem ratione rerum voluptatem!
		</div>
		<div>Autem consequuntur explicabo fuga illo itaque iusto sit temporibus? Animi eius illum iusto minima officiis
			possimus quibusdam, tempore unde vel? Accusamus aperiam consequuntur itaque maiores perspiciatis quam tempora
			voluptatibus voluptatum!
		</div>
		<div>Alias dignissimos dolorem est harum, hic, impedit incidunt itaque laboriosam laudantium maxime officia
			perspiciatis quaerat quas quia quo quos unde voluptas voluptatum? Ab aliquam itaque modi placeat quaerat quis
			quos!
		</div>
		<div>Amet asperiores consequatur cum cumque debitis eaque, eos, error, est ex fugit laboriosam laudantium molestias
			nihil placeat provident quaerat quasi quia rerum suscipit veniam. Dolorum eaque nulla quibusdam sint vel.
		</div>
		<div>Animi at commodi fugiat id qui! Accusamus, doloribus eveniet facilis harum laboriosam nam officiis quisquam sit
			ut vero. Amet eius et eum in inventore nihil sit ullam. Aspernatur, nulla sint.
		</div>
		<div>A aliquam asperiores at debitis dignissimos dolor dolorum eius, excepturi illum impedit minus molestiae,
			mollitia nam nostrum nulla quae quam quidem repellendus rerum sapiente, sunt vel veritatis voluptas voluptate
			voluptates!
		</div>
		<div>Accusantium adipisci aliquam aliquid cum, doloremque et eum facere facilis fuga in laborum molestiae neque
			praesentium quia quis quos sed sit, temporibus ullam, vitae? Esse est natus quae similique veritatis.
		</div>
		<div>Amet assumenda cum dignissimos dolore excepturi harum modi molestiae odit quis, veritatis. Accusamus, aliquid
			distinctio dolores enim eveniet itaque libero magnam necessitatibus obcaecati possimus praesentium quae recusandae
			reiciendis similique voluptates!
		</div>
		<div>Aliquid, deserunt doloremque hic id necessitatibus nulla repellendus velit voluptas! Alias beatae nostrum
			numquam quasi quidem ratione. Corporis, debitis dolore eaque eveniet expedita fugit illum perferendis quas
			quibusdam vel velit?
		</div>
		<div>Alias, aspernatur at consequuntur corporis cum dignissimos dolorem earum enim expedita fugit hic iure magni
			necessitatibus optio quae quasi qui quo sint suscipit temporibus ullam vel voluptatem. Iusto quia, veritatis.
		</div>
		<div>Aliquid deserunt dolore et nesciunt odio quibusdam vitae. A ad, adipisci commodi cumque dicta dolorem doloremque
			est ipsam, ipsum molestiae numquam qui sequi similique vel voluptates! Libero officia quia veniam!
		</div>
		<div>Dolorum expedita nihil optio velit veniam? A ab, ad assumenda aut blanditiis, delectus deleniti dicta eos et
			illum ipsum mollitia necessitatibus nesciunt quia reprehenderit repudiandae tempore, temporibus unde voluptates
			voluptatibus?
		</div>
		<div>Accusantium ea ipsa minus nostrum numquam, quis sequi. Consequatur earum error eum fuga illo, iste maiores
			minima nihil non odit optio perspiciatis quod ratione, suscipit tenetur. Inventore porro tempora voluptas.
		</div>
		<div>Ad at, eaque et facilis illum incidunt, libero magni maiores minima, neque nesciunt nulla possimus recusandae
			soluta ullam. Aut doloremque ea et explicabo illo iste laborum praesentium qui quos tempora!
		</div>
		<div>Dignissimos eum excepturi labore, maiores quasi recusandae repudiandae suscipit? Cum, cupiditate, delectus
			dolorem earum fugiat harum iure, perspiciatis porro rem tempore totam veritatis. Ab eum inventore praesentium
			quaerat. Amet, hic.
		</div>
		<div>At consectetur deleniti deserunt, dicta eligendi, est illo ipsam iusto odit officia praesentium quae ratione,
			sapiente similique sint? Dicta eligendi enim exercitationem, hic inventore itaque laudantium unde velit veniam
			voluptate!
		</div>
</template>

<style scoped>
.logo-text {
	letter-spacing: .125em;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, .8);
	font-family: "Chinese Quotes", serif;
}
</style>